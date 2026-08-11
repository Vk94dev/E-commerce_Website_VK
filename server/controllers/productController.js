import Product from "../models/Product.js";

import {
    uploadMultipleImages,
    deleteMultipleImages,
    uploadToCloudinary
} from "../utils/cloudinaryUpload.js";

// ======================================
// @desc    Create Product
// @route   POST /api/products
// @access  Private/Admin
// ======================================
export const createProduct = async (req, res) => {
    try {

        const {
            name,
            description,
            brand,
            category,
            price,
            discount,
            stock,
            images
        } = req.body;

        if (!name || !description || !category || !price || stock == null) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // let images = [];

        if (req.files && req.files.length > 0) {
            images = await uploadMultipleImages(
                req.files,
                "ecommerce/products"
            );
        }

        const product = await Product.create({
            name,
            description,
            brand,
            category,
            price,
            discount,
            stock,

            images,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ======================================
// @desc    Get All Products
// @route   GET /api/products
// @access  Public
// ======================================
export const getProducts = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i"
                }
            }
            : {};

        const category = req.query.category
            ? { category: req.query.category }
            : {};

        const filter = {
            ...keyword,
            ...category
        };

        const count = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({
                createdAt: -1
            });

        res.status(200).json({
            success: true,
            totalProducts: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// @desc    Get Single Product
// @route   GET /api/products/:id
// @access  Public
// ======================================
export const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private/Admin
// ======================================
// export const updateProduct = async (req, res) => {

//     try {

//         const product = await Product.findById(req.params.id);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found."
//             });
//         }
//         console.log("pre- product = ", product);

//         Object.assign(product, req.body);
//         console.log("in-product = ", product);
//         if (req.files && req.files.length > 0) {

//             await deleteMultipleImages(product.images);

//             product.images = await uploadMultipleImages(
//                 req.files,
//                 "ecommerce/products"
//             );

//         }

//         const updatedProduct = await product.save();

//         console.log("update-Product = ", updateProduct);

//         res.status(200).json({
//             success: true,
//             message: "Product updated successfully.",
//             product: updatedProduct
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }

// };



export const updateProduct = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            name,
            description,
            stock,
            category,
            price
        } = req.body;


        const product = await Product.findById(id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }


        // Update normal fields

        product.name = name;
        product.description = description;
        product.stock = stock;
        product.category = category;
        product.price = price;



        // If new image uploaded
        console.log("req file = ", req.file);
        if (req.file) {

            console.log("New image received = ", req.file);
            // Upload new image to Cloudinary
            // and replace product.images[0]

            if (product.images?.[0]?.public_id) {

                await cloudinary.uploader.destroy(
                    product.images[0].public_id
                );
                console.log("old image deleted =", product.images[0].public_id);
            }

            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "products"
                }
            );

            console.log("new cloudinary image = ", result);

            product.images = [
                {
                    public_id: result.public_id,
                    url: result.secure_url
                }
            ];

        }


        const updatedProduct = await product.save();


        res.status(200).json({

            success: true,

            message: "Product updated successfully",

            product: updatedProduct

        });


    } catch (error) {

        console.log("UPDATE PRODUCT ERROR:", error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
// ======================================
export const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        await deleteMultipleImages(product.images);

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// @desc    Create Product Review
// @route   POST /api/products/:id/review
// @access  Private
// ======================================
export const createProductReview = async (req, res) => {

    try {

        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        const alreadyReviewed = product.reviews.find(
            (review) =>
                review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product."
            });
        }

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce(
                (acc, item) => acc + item.rating,
                0
            ) / product.reviews.length;

        await product.save();

        res.status(201).json({
            success: true,
            message: "Review added successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};