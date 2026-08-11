import express from "express";

import {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart
} from "../controllers/cartController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ======================================
// All Cart Routes (Protected)
// ======================================

// Add Product to Cart
router.post("/", protect, addToCart);

// Get Logged-in User Cart
router.get("/", protect, getCart);

// Update Cart Quantity
router.put("/:id", protect, updateCart);

// Remove Item From Cart
router.delete("/:id", protect, removeFromCart);

// Clear Entire Cart
router.delete("/", protect, clearCart);

export default router;