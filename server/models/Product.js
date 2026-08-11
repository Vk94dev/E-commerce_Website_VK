import mongoose from "mongoose";

// Review Schema
const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comment: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Product Schema
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },

        description: {
            type: String,
            required: [true, "Description is required"]
        },

        brand: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        discount: {
            type: Number,
            default: 0
        },

        stock: {
            type: Number,
            required: true,
            default: 0
        },

        images: [
    {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
],
        reviews: [reviewSchema],

        rating: {
            type: Number,
            default: 0
        },

        numReviews: {
            type: Number,
            default: 0
        },

        featured: {
            type: Boolean,
            default: false
        },

        bestSeller: {
            type: Boolean,
            default: false
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;