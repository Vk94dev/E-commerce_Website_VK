import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

/**
 * Upload a single image buffer to Cloudinary
 */
export const uploadToCloudinary = (fileBuffer, folder = "ecommerce/products") => {

    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image"
            },
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve({
                    public_id: result.public_id,
                    url: result.secure_url
                });

            }
        );

        streamifier
            .createReadStream(fileBuffer)
            .pipe(uploadStream);

    });

};


/**
 * Delete image from Cloudinary
 */

export const deleteFromCloudinary = async (publicId) => {

    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);

};

/**
 * Upload multiple images
 */

export const uploadMultipleImages = async (
    files,
    folder = "ecommerce/products"
) => {

    const uploadedImages = [];

    for (const file of files) {

        const image = await uploadToCloudinary(
            file.buffer,
            folder
        );

        uploadedImages.push(image);

    }

    return uploadedImages;

};


/**
 * Delete multiple images
 */

export const deleteMultipleImages = async (images = []) => {

    for (const image of images) {

        if (image.public_id) {

            await deleteFromCloudinary(
                image.public_id
            );

        }

    }

};



