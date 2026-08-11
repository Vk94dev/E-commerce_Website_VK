import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    getProfile,
    updateProfile,
    googleAuth
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// const admin = require("../config/firebaseAdmin");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

router.post("/logout",logoutUser);

router.get("/me",protect,getMe);

// Get Logged-in User Profile
router.get("/profile", protect, getProfile);

// Update User Profile
router.put("/profile", protect,upload.single("profileImage"), updateProfile);

router.post("/google",googleAuth);


export default router;