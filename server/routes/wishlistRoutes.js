import express from "express";

import { addToWishlist, getWishlist, removeWishlist, moveToCart} from "../controllers/wishlistController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToWishlist);

router.get("/", protect, getWishlist);

router.delete("/:id", protect, removeWishlist);

router.post("/move/:id", protect, moveToCart);

export default router;





