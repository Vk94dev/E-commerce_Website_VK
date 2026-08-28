import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @desc    Add product review
// @route   POST /api/reviews/:productId
// @access  Private

const addReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const alreadyReviewed = product.reviews.find(
        (review) =>
            review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
        res.status(400);
        throw new Error("You have already reviewed this product");
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
        ) / product.numReviews;

    await product.save();

    res.status(201).json({
        message: "Review added successfully",
        reviews: product.reviews,
        rating: product.rating,
        numReviews: product.numReviews
    });

});


// @desc    Get product reviews
// @route   GET /api/reviews/:productId
// @access  Public

const getProductReviews = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.productId)
        .select("reviews rating numReviews");

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    const endIndex = startIndex + limit;

    const reviews = product.reviews
        .sort(
            (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
        )
        .slice(startIndex, endIndex);

    res.json({
        totalReviews: product.numReviews,
        currentPage: page,
        totalPages: Math.ceil(product.numReviews / limit),
        rating: product.rating,
        reviews
    });

});


// @desc    Update a review
// @route   PUT /api/reviews/:productId
// @access  Private

const updateReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const review = product.reviews.find(
        (item) =>
            item.user.toString() === req.user._id.toString()
    );

    if (!review) {
        res.status(404);
        throw new Error("Review not found");
    }

    review.rating = Number(rating);
    review.comment = comment;

    product.rating =
        product.reviews.reduce(
            (acc, item) => acc + item.rating,
            0
        ) / product.reviews.length;

    await product.save();

    res.json({
        message: "Review updated successfully",
        review,
        rating: product.rating
    });

});


// @desc    Delete a review
// @route   DELETE /api/reviews/:productId
// @access  Private

const deleteReview = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const review = product.reviews.find(
        (item) =>
            item.user.toString() === req.user._id.toString()
    );

    if (!review) {
        res.status(404);
        throw new Error("Review not found");
    }

    product.reviews = product.reviews.filter(
        (item) =>
            item.user.toString() !== req.user._id.toString()
    );

    product.numReviews = product.reviews.length;

    if (product.numReviews === 0) {

        product.rating = 0;

    } else {

        product.rating =
            product.reviews.reduce(
                (acc, item) => acc + item.rating,
                0
            ) / product.numReviews;

    }

    await product.save();

    res.json({
        message: "Review deleted successfully"
    });

});


// @desc    Get all reviews of a product
// @route   GET /api/reviews/admin/:productId
// @access  Admin

const getAllReviews = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.productId)
        .select("name reviews rating numReviews");

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    res.json({
        productName: product.name,
        totalReviews: product.numReviews,
        averageRating: product.rating,
        reviews: product.reviews
    });

});

// @desc    Delete any review
// @route   DELETE /api/reviews/admin/:productId/:reviewId
// @access  Admin

const adminDeleteReview = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.productId);

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    const review = product.reviews.id(req.params.reviewId);

    if (!review) {
        res.status(404);
        throw new Error("Review not found");
    }

    review.deleteOne();

    product.numReviews = product.reviews.length;

    if (product.numReviews === 0) {

        product.rating = 0;

    } else {

        product.rating =
            product.reviews.reduce(
                (acc, item) => acc + item.rating,
                0
            ) / product.numReviews;

    }

    await product.save();

    res.json({
        message: "Review deleted successfully by admin"
    });

});


// @desc    Get review statistics
// @route   GET /api/reviews/admin/stats
// @access  Admin

const getReviewStats = asyncHandler(async (req, res) => {

    const stats = await Product.aggregate([
        {
            $project: {
                name: 1,
                rating: 1,
                numReviews: 1
            }
        },
        {
            $group: {
                _id: null,
                totalProducts: {
                    $sum: 1
                },
                totalReviews: {
                    $sum: "$numReviews"
                },
                averageRating: {
                    $avg: "$rating"
                }
            }
        }
    ]);

    res.json(
        stats.length
            ? stats[0]
            : {
                  totalProducts: 0,
                  totalReviews: 0,
                  averageRating: 0
              }
    );

});

// @desc    Get top rated products
// @route   GET /api/reviews/admin/top-rated
// @access  Admin

const getTopRatedProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({
        numReviews: {
            $gt: 0
        }
    })
        .select("name rating numReviews price category images")
        .sort({
            rating: -1,
            numReviews: -1
        })
        .limit(10);

    res.json(products);

});

// @desc    Get most reviewed products
// @route   GET /api/reviews/admin/most-reviewed
// @access  Admin

const getMostReviewedProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({
        numReviews: {
            $gt: 0
        }
    })
        .select("name rating numReviews price category images")
        .sort({
            numReviews: -1
        })
        .limit(10);

    res.json(products);

});

// @desc    Rating distribution
// @route   GET /api/reviews/admin/rating-distribution
// @access  Admin

const getRatingDistribution = asyncHandler(async (req, res) => {

    const products = await Product.find().select("reviews");

    const distribution = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };

    products.forEach((product) => {

        product.reviews.forEach((review) => {

            distribution[review.rating]++;

        });

    });

    res.json(distribution);

});









export {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
    getAllReviews,
    adminDeleteReview,
    getReviewStats,
    getTopRatedProducts,
    getMostReviewedProducts,
    getRatingDistribution
};




