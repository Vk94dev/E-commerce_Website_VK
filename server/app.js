import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";


// Import Database Connection
import connectDB from "./config/db.js";







// Import Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";


// Load Environment Variables
dotenv.config();


// Connect MongoDB
connectDB();

// Create Express App
const app = express();



app.use(
    cors({
        origin:"http://localhost:5173",
        credentials: true,
    })
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});



// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use( "/uploads",express.static( path.join(process.cwd(),"uploads") ));


// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to MERN E-commerce Backend"
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist",wishlistRoutes)

app.use("/api/upload", uploadRoutes);
app.use("/api/admin",adminRoutes);

app.use("/api/categories",categoryRoutes);
app.use("/api/contact",contactRoutes);

// 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});