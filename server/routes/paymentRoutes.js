import express from "express";

import {
    createRazorpayOrder,
    getRazorpayKey,
    verifyRazorpayPayment,
    getPaymentDetails,
    getPaymentHistory,
    handleWebhook,
    refundPayment,
    getPaymentStats
} from "../controllers/paymentController.js";

import {
    protect,
    admin
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ------------------------------------------
   Public Routes
------------------------------------------ */

// Razorpay Public Key
router.get("/key", getRazorpayKey);

// Razorpay Webhook
router.post("/webhook", handleWebhook);

/* ------------------------------------------
   User Routes
------------------------------------------ */

// Create Razorpay Order
router.post(
    "/create-order",
    protect,
    createRazorpayOrder
);

// Verify Payment
router.post(
    "/verify",
    protect,
    verifyRazorpayPayment
);

// Payment History
router.get(
    "/history",
    protect,
    getPaymentHistory
);

// Payment Details
router.get(
    "/:paymentId",
    protect,
    getPaymentDetails
);

/* ------------------------------------------
   Admin Routes
------------------------------------------ */

// Refund Payment
router.post(
    "/refund/:orderId",
    protect,
    admin,
    refundPayment
);

// Payment Statistics
router.get(
    "/admin/stats",
    protect,
    admin,
    getPaymentStats
);

export default router;