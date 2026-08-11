import asyncHandler from "express-async-handler";

import {
    uploadToCloudinary,
    uploadMultipleImages,
    deleteFromCloudinary
} from "../utils/cloudinaryUpload.js";


// @desc    Upload single image
// @route   POST /api/upload
// @access  Private

const uploadSingleImage = asyncHandler(async (req, res) => {

    if (!req.file) {
        res.status(400);
        throw new Error("Please upload an image");
    }

    const image = await uploadToCloudinary(
        req.file.buffer
    );

    res.status(201).json({
        success: true,
        image
    });

});


// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private

const uploadImages = asyncHandler(async (req, res) => {

    if (!req.files || req.files.length === 0) {
        res.status(400);
        throw new Error("Please upload at least one image");
    }

    const images = await uploadMultipleImages(
        req.files
    );

    res.status(201).json({
        success: true,
        count: images.length,
        images
    });

});


// @desc    Delete image
// @route   DELETE /api/upload/:publicId
// @access  Private

const deleteImage = asyncHandler(async (req, res) => {

    const { publicId } = req.params;

    if (!publicId) {
        res.status(400);
        throw new Error("Public ID is required");
    }

    await deleteFromCloudinary(publicId);

    res.json({
        success: true,
        message: "Image deleted successfully"
    });

});

export {
    uploadSingleImage,
    uploadImages,
    deleteImage
};





