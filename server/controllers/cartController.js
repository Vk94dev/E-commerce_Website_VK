import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ==========================================
// @desc    Add Product to Cart
// @route   POST /api/cart
// @access  Private
// ==========================================
export const addToCart = async (req, res) => {
    try {

        const { productId, quantity } = req.body;

    //    console.log("id = ",productId);
    //    console.log("user = ",req.user);
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required."
            });
        }

        const product = await Product.findById(productId);
        
        // console.log("product = ",product);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        let cartItem = await Cart.findOne({
            user: req.user._id,
            product: productId
        });

        if (cartItem) {

            cartItem.quantity += quantity || 1;
            cartItem.price = product.price;

            await cartItem.save();

            return res.status(200).json({
                success: true,
                message: "Cart updated successfully.",
                cartItem
            });
        }
        // console.log("cart = ",cartItem);

        cartItem = await Cart.create({
            user: req.user._id,
            product: productId,
            quantity: quantity || 1,
            price: product.price
        });
        // console.log("cartItem = ",cartItem)

        res.status(201).json({
            success: true,
            message: "Product added to cart.",
            cartItem
        });

    } catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log(err.errors);

    res.status(500).json({
        success: false,
        message: err.message
    });
}
};

// ==========================================
// @desc    Get Logged-in User Cart
// @route   GET /api/cart
// @access  Private
// ==========================================
export const getCart = async (req, res) => {

    try {

        const cart = await Cart.find({
            user: req.user._id
        }).populate("product");

        const grandTotal = cart.reduce(
            (sum, item) => sum + item.totalPrice,
            0
        );

        res.status(200).json({
            success: true,
            totalItems: cart.length,
            grandTotal,
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================================
// @desc    Update Cart Quantity
// @route   PUT /api/cart/:id
// @access  Private
// ==========================================
export const updateCart = async (req, res) => {

    try {

        const { quantity } = req.body;

        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found."
            });

        }

        if (cartItem.user.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized."
            });

        }

        cartItem.quantity = quantity;

        await cartItem.save();

        res.status(200).json({
            success: true,
            message: "Cart updated successfully.",
            cartItem
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================================
// @desc    Remove Item From Cart
// @route   DELETE /api/cart/:id
// @access  Private
// ==========================================
export const removeFromCart = async (req, res) => {

    try {

        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found."
            });

        }

        if (cartItem.user.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized."
            });

        }

        await cartItem.deleteOne();

        res.status(200).json({
            success: true,
            message: "Item removed from cart."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ==========================================
// @desc    Clear User Cart
// @route   DELETE /api/cart
// @access  Private
// ==========================================
export const clearCart = async (req, res) => {

    try {

        await Cart.deleteMany({
            user: req.user._id
        });

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};