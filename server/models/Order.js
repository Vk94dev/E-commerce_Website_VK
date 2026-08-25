import mongoose from "mongoose";

// ======================================
// Order Item Schema
// ======================================
const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        image: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        _id: false
    }
);

// ======================================
// Shipping Address Schema
// ======================================
const shippingAddressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            // required: true
        },

        phone: {
            type: String,
            // required: true
        },

        address: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            // required: true
        },

        pincode: {
            type: String,
            required: true
        },

        country: {
            type: String,
            default: "India"
        }
    },
    {
        _id: false
    }
);

// ======================================
// Order Schema
// ======================================
const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        orderItems: {
            type: [orderItemSchema],
            required: true
        },

        shippingAddress: {
            type: shippingAddressSchema,
            required: true
        },

        paymentMethod: {
            type: String,
            enum: ["cod", "online", "Razorpay", "Stripe"],
            required: true
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending"
        },
        paymentResult: {
            id: String,
            orderId: String,
            signature: String,
            status: String,
            method: String,
            email: String,
            refundId: String
        },

        orderStatus: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Packed",
                "Shipped",
                "Out for Delivery",
                "Delivered",
                "Cancelled"
            ],
            default: "Pending"
        },

        itemsPrice: {
            type: Number,
            required: true
        },

        taxPrice: {
            type: Number,
            default: 0
        },

        shippingPrice: {
            type: Number,
            default: 0
        },

        totalPrice: {
            type: Number,
            required: true
        },
        razorpayOrderId: {
            type: String
        },

        isDelivered: {
            type: Boolean,
            default: false
        },

        deliveredAt: {
            type: Date
        },

        paidAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;



