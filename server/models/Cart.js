import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        // User who owns this cart item
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Product added to cart
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        // Quantity of the product
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        },

        // Price of one product
        price: {
            type: Number,
            required: true
        },

        // Total price for this cart item
        totalPrice: {
            type: Number,
            // required: true
        }
    },
    {
        timestamps: true
    }
);

// Automatically calculate total price before saving
// cartSchema.pre("save", function (next) {
//     this.totalPrice = this.price * this.quantity;
//     next();
// });

cartSchema.pre("save", function () {
    this.totalPrice = this.price * this.quantity;
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;