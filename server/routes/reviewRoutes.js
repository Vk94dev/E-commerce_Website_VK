import express from "express";

import {
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
} from "../controllers/reviewController.js";

import {
    protect,
    admin
} from "../middleware/authMiddleware.js";

const router = express.Router();


// Admin

router.get(
    "/admin/stats",
    protect,
    admin,
    getReviewStats
);

router.get(
    "/admin/top-rated",
    protect,
    admin,
    getTopRatedProducts
);

router.get(
    "/admin/most-reviewed",
    protect,
    admin,
    getMostReviewedProducts
);

router.get(
    "/admin/rating-distribution",
    protect,
    admin,
    getRatingDistribution
);

router.get(
    "/admin/:productId",
    protect,
    admin,
    getAllReviews
);

router.delete(
    "/admin/:productId/:reviewId",
    protect,
    admin,
    adminDeleteReview
);



// Public
router.get("/:productId", getProductReviews);


// User
router.post("/:productId", protect, addReview);

router.put("/:productId", protect, updateReview);

router.delete("/:productId", protect, deleteReview);


export default router;