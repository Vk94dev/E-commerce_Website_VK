import express from "express";

import {
    uploadSingleImage,
    uploadImages,
    deleteImage
} from "../controllers/uploadController.js";

import upload from "../middleware/uploadMiddleware.js";

import {
    protect,
    admin
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ==========================================
   Upload Single Image
   POST /api/upload
========================================== */

router.post(
    "/",
    protect,
    admin,
    upload.single("image"),
    uploadSingleImage
);

/* ==========================================
   Upload Multiple Images
   POST /api/upload/multiple
========================================== */

router.post(
    "/multiple",
    protect,
    admin,
    upload.array("images", 5),
    uploadImages
);

/* ==========================================
   Delete Image
   DELETE /api/upload/:publicId
========================================== */

router.delete(
    "/:publicId",
    protect,
    admin,
    deleteImage
);

export default router;