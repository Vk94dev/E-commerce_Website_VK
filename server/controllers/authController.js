import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import "../config/firebaseAdmin.js";
import jwt from "jsonwebtoken";
import { getAuth } from "firebase-admin/auth";



// ==========================
// Register User
// ==========================
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Check Existing User
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        // Create User
        const user = await User.create({
            name,
            email,
            password,
            phone,
            address
        });

        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            //    secure: process.env.NODE_ENV === "production",
            // secure:false,
            // sameSite: "lax",
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "Registration successful.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};




export const googleAuth = async (req, res) => {
    try {
        const { token } = req.body;

        // const decoded = await admin.auth().verifyIdToken(token);

        const decoded = await getAuth().verifyIdToken(token);
        console.log("decoded = ", decoded);

        const { uid, email, name, picture } = decoded;
        console.log("uid = ", uid);
        console.log("email = ", email);
        console.log("name = ", name);

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                googleId: uid,
                name,
                email,
                profileImage: picture,
            });
        } else {
            if (!user.googleId) {
                user.googleId = uid;
            }
            if (!user.profileImage) {
                user.profileImage = picture;
            }
            await user.save();
        }
        console.log("createdUser = ", user);

        const jwtToken = generateToken(user._id);
        console.log("token = ", jwtToken);

        res.cookie("token", jwtToken, {
            httpOnly: true,
            //    secure: process.env.NODE_ENV === "production",
            // secure:false,
            // sameSite: "lax",
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Google login successful",
            user,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ==========================
// Login User
// ==========================
export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        //   console.log("email = ",email);
        //   console.log("password = ",password);

        // Find User
        const user = await User.findOne({ email });

        // console.log("user found = ",user);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Check Password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const token = generateToken(user._id, user.role);
        res.cookie("token", token, {
            httpOnly: true,
            //    secure: process.env.NODE_ENV === "production",
            // secure:false,   
            // sameSite: "lax",
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



export const logoutUser = async (req, res) => {
    try {
        console.log("backend logout")
        res.clearCookie("token", {
            httpOnly: true,
            // secure: false,      // true in production with HTTPS
            // sameSite: "lax",
            secure: true,
            sameSite: "none",
            path: "/"
        });
        res.status(200).json({
            success: true,
            message: "Logged out",
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


// GET /api/auth/me

export const getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });

    }
    catch (err) {
        console.log(err.message);
    }

};


// ==========================
// Get User Profile
// ==========================
export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================
// Update User Profile
// ==========================
export const updateProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.address = req.body.address || user.address;

        // console.log(req.file);
        if (req.file) {
            user.profileImage = `${req.protocol}://${req.get("host")}/uploads/profile/${req.file.filename}`;
        }

        // Update password if provided
        if (req.body.password) {
            user.password = req.body.password;
        }

        await user.save();
        console.log(user);
        // const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            // user: {
            //     _id: updatedUser._id,
            //     name: updatedUser.name,
            //     email: updatedUser.email,
            //     phone: updatedUser.phone,
            //     address: updatedUser.address,
            //     role: updatedUser.role
            // }
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};