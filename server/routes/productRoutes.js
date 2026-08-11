import express from "express";
import upload from "../middleware/uploadMiddleware.js";


import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProductReview
} from "../controllers/productController.js";

import {
    protect,
    admin
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// Public Routes
// ==========================================

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProductById);

// ==========================================
// Protected Routes
// ==========================================

// Add Review
router.post("/:id/review", protect, createProductReview);

// ==========================================
// Admin Routes
// ==========================================

// Create Product
router.post("/", protect, admin, upload.array("images", 5), createProduct);

// Update Product
router.put("/:id", protect, admin, upload.single("image"), updateProduct);

// Delete Product
router.delete("/:id", protect, admin, deleteProduct);

export default router;