// const express = require("express");
import express from "express"

const router = express.Router();

import {
    placeOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    markOrderAsPaid,
    markOrderAsDelivered,
    cancelOrder,
    getDashboardStats,
    getMonthlySales,
    getOrderStatusSummary,
    getTopSellingProducts,
    getDailySales
} from "../controllers/orderController.js";

import {protect, admin} from "../middleware/authMiddleware.js";


// ==========================
// User Routes
// ==========================

// Place a new order
router.post("/", protect, placeOrder);

// Get logged in user's orders
router.get("/my-orders", protect, getMyOrders);

// Get all orders by admin
router.get("/admin", protect, admin, getAllOrders);


// Get single order
router.get("/:id", protect, getOrderById);

// Mark order as paid
router.put("/:id/pay", protect, markOrderAsPaid);

// Cancel order
router.put("/:id/cancel", protect, cancelOrder);


// ==========================
// Admin Routes
// ==========================



// Dashboard statistics
router.get(
    "/dashboard",
    protect,
    admin,
    getDashboardStats
);

// Monthly sales
router.get(
    "/stats/monthly",
    protect,
    admin,
    getMonthlySales
);

// Daily sales
router.get(
    "/stats/daily",
    protect,
    admin,
    getDailySales
);

// Order status summary
router.get(
    "/stats/status",
    protect,
    admin,
    getOrderStatusSummary
);

// Top selling products
router.get(
    "/stats/top-products",
    protect,
    admin,
    getTopSellingProducts
);

// Update order status
router.put(
    "/:id/status",
    protect,
    admin,
    updateOrderStatus
);

// Mark delivered
router.put(
    "/:id/deliver",
    protect,
    admin,
    markOrderAsDelivered
);

export default router;


