import  Wishlist from "../models/Wishlist.js"
import Product from "../models/Product.js"
import Cart from "../models/Cart.js";

export const addToWishlist = async (req, res) => {

    try {

        const { productId } = req.body;

        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        const exist = await Wishlist.findOne({
            user: req.user._id,
            product: productId
        });

        if (exist) {

            return res.status(400).json({
                success: false,
                message: "Already in wishlist"
            });

        }

        const wishlist = await Wishlist.create({

            user: req.user._id,
            product: productId

        });

        res.status(201).json({

            success: true,
            message: "Added to wishlist",
            wishlist,
            product

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



export const getWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.find({
            user: req.user._id
        }).populate("product");

        res.status(200).json({
            success: true,
            wishlist
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




export const removeWishlist = async (req, res) => {

    try {

        await Wishlist.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            success: true,
            message: "Removed from wishlist"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};





export const moveToCart = async (req, res) => {

    try {

        const wishlist = await Wishlist.findById(req.params.id)
            .populate("product");

        if (!wishlist) {

            return res.status(404).json({

                success: false,
                message: "Wishlist item not found"

            });

        }

        const product = wishlist.product;

        await Cart.create({

            user: req.user._id,
            product: product._id,
            quantity: 1,
            price: product.price,
            totalPrice: product.price

        });

        await Wishlist.findByIdAndDelete(
            wishlist._id
        );

        res.status(200).json({

            success: true,
            message: "Moved to cart"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};









