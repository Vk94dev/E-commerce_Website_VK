import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect Routes
export const protect = async (req, res, next) => {

    try {
        // Check Authorization Header
        // if (
        //     req.headers.authorization &&
        //     req.headers.authorization.startsWith("Bearer")
        // ) 
        if(req.cookies.token){
            // Extract Token
            // token = req.headers.authorization.split(" ")[1];
           const token = req.cookies.token;

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find User
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found"
                });
            }

            next();
        } 
        else {
            return res.status(401).json({
                success: false,
                message: "Not authorized. Token missing."
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

// Admin Middleware
export const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });
    }
};