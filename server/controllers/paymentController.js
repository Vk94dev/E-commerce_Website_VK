// import asyncHandler from "express-async-handler";
// import crypto from "crypto";

// // import Razorpay from "razorpay";

// import Order from "../models/Order.js";

// import razorpay from "../config/razorpay.js";

// // const razorpay = new Razorpay({
// //     key_id: process.env.RAZORPAY_KEY_ID,
// //     key_secret: process.env.RAZORPAY_KEY_SECRET
// // });

// // @desc    Create Razorpay Order
// // @route   POST /api/payment/create-order
// // @access  Private

// const createRazorpayOrder = asyncHandler(async (req, res) => {

//     const { orderId } = req.body;

//     const order = await Order.findById(orderId);

//     if (!order) {
//         res.status(404);
//         throw new Error("Order not found");
//     }

//     if (order.isPaid) {
//         res.status(400);
//         throw new Error("Order is already paid");
//     }

//     const options = {

//         amount: Math.round(order.totalPrice * 100),

//         currency: "INR",

//         receipt: order._id.toString(),

//         payment_capture: 1

//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     order.razorpayOrderId = razorpayOrder.id;
//     await order.save();

//     res.status(201).json({
//         success: true,
//         razorpayOrder,
//         key: process.env.RAZORPAY_KEY_ID
//     });

// });


// // @desc    Get Razorpay Key
// // @route   GET /api/payment/key
// // @access  Public

// const getRazorpayKey = asyncHandler(async (req, res) => {

//     res.json({
//         key: process.env.RAZORPAY_KEY_ID
//     });

// });

// // @desc    Verify Razorpay Payment
// // @route   POST /api/payment/verify
// // @access  Private

// const verifyRazorpayPayment = asyncHandler(async (req, res) => {

//     const {
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//         orderId
//     } = req.body;

//     const generatedSignature = crypto
//         .createHmac(
//             "sha256",
//             process.env.RAZORPAY_KEY_SECRET
//         )
//         .update(
//             `${razorpay_order_id}|${razorpay_payment_id}`
//         )
//         .digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//         res.status(400);
//         throw new Error("Invalid payment signature");
//     }

//     const order = await Order.findById(orderId);

//     if (!order) {
//         res.status(404);
//         throw new Error("Order not found");
//     }

//     if (order.isPaid) {
//         return res.json({
//             success: true,
//             message: "Order already marked as paid",
//             order
//         });
//     }

//     order.isPaid = true;

//     order.paidAt = new Date();

//     order.paymentMethod = "Razorpay";

//     order.paymentResult = {
//         id: razorpay_payment_id,
//         orderId: razorpay_order_id,
//         signature: razorpay_signature,
//         status: "Paid"
//     };

//     await order.save();

//     res.json({
//         success: true,
//         message: "Payment verified successfully",
//         order
//     });

// });


// // @desc    Get Razorpay Payment Details
// // @route   GET /api/payment/:paymentId
// // @access  Private

// const getPaymentDetails = asyncHandler(async (req, res) => {

//     const payment = await razorpay.payments.fetch(
//         req.params.paymentId
//     );

//     res.json(payment);

// });

// // @desc    Get user's paid orders
// // @route   GET /api/payment/history
// // @access  Private

// const getPaymentHistory = asyncHandler(async (req, res) => {

//     const orders = await Order.find({
//         user: req.user._id,
//         isPaid: true
//     })
//         .sort({
//             createdAt: -1
//         });

//     res.json(orders);

// });


// // @desc    Handle Razorpay Webhook
// // @route   POST /api/payment/webhook
// // @access  Public

// const handleWebhook = asyncHandler(async (req, res) => {

//     const webhookSignature = req.headers["x-razorpay-signature"];

//     const expectedSignature = crypto
//         .createHmac(
//             "sha256",
//             process.env.RAZORPAY_WEBHOOK_SECRET
//         )
//         .update(req.bodyRaw)
//         .digest("hex");

//     if (expectedSignature !== webhookSignature) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid webhook signature"
//         });
//     }

//     const event = req.body.event;

//     if (event === "payment.captured") {

//         const payment = req.body.payload.payment.entity;

//         const order = await Order.findOne({
//             "paymentResult.orderId": payment.order_id
//         });

//         if (order && !order.isPaid) {

//             order.isPaid = true;

//             order.paidAt = new Date();

//             order.paymentResult = {
//                 id: payment.id,
//                 orderId: payment.order_id,
//                 status: payment.status,
//                 method: payment.method,
//                 email: payment.email || ""
//             };

//             await order.save();

//         }

//     }

//     res.status(200).json({
//         success: true
//     });

// });

// // @desc    Refund Payment
// // @route   POST /api/payment/refund/:orderId
// // @access  Admin

// const refundPayment = asyncHandler(async (req, res) => {

//     const order = await Order.findById(req.params.orderId);

//     if (!order) {
//         res.status(404);
//         throw new Error("Order not found");
//     }

//     if (!order.isPaid) {
//         res.status(400);
//         throw new Error("Order is not paid");
//     }

//     const refund = await razorpay.payments.refund(
//         order.paymentResult.id,
//         {}
//     );

//     order.paymentResult.refundId = refund.id;

//     order.paymentResult.status = "Refunded";

//     await order.save();

//     res.json({
//         success: true,
//         refund
//     });

// });

// // @desc    Payment Statistics
// // @route   GET /api/payment/admin/stats
// // @access  Admin

// const getPaymentStats = asyncHandler(async (req, res) => {

//     const totalPaidOrders = await Order.countDocuments({
//         isPaid: true
//     });

//     const totalPendingOrders = await Order.countDocuments({
//         isPaid: false
//     });

//     const revenue = await Order.aggregate([
//         {
//             $match: {
//                 isPaid: true
//             }
//         },
//         {
//             $group: {
//                 _id: null,
//                 totalRevenue: {
//                     $sum: "$totalPrice"
//                 }
//             }
//         }
//     ]);

//     res.json({

//         totalPaidOrders,

//         totalPendingOrders,

//         totalRevenue:
//             revenue.length > 0
//                 ? revenue[0].totalRevenue
//                 : 0

//     });

// });









// export {
//     createRazorpayOrder,
//     getRazorpayKey,
//     verifyRazorpayPayment,
//     getPaymentDetails,
//     getPaymentHistory,
//     handleWebhook,
//     refundPayment,
//     getPaymentStats
// };





















import razorpay from "../config/razorpay.js";
import crypto from "crypto";

// ========================================
// CREATE RAZORPAY ORDER
// ========================================
export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount",
            });
        }

        // Razorpay requires amount in paise.
        // Example:
        // ₹12800 = 1280000 paise

        const options = {
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        console.error("Create Razorpay Order Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to create Razorpay order",
            error: error.message,
        });
    }
};


// ========================================
// VERIFY RAZORPAY PAYMENT
// ========================================
export const verifyRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment information is missing",
            });
        }

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");

        const isValid = crypto.timingSafeEqual(
            Buffer.from(expectedSignature, "hex"),
            Buffer.from(razorpay_signature, "hex")
        );

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }

        // Payment is genuine
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
        });

    } catch (error) {
        console.error("Payment Verification Error:", error);

        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
            error: error.message,
        });
    }
};









