import multer from "multer";
import path from "path";

// Store files in memory (recommended for Cloudinary)
// const storage = multer.memoryStorage();


// for disk storage 
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads/profile");
    },
    filename:function(req,file,cb){
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    }
});




// Allow only image files
const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only JPG, JPEG, PNG, WEBP and GIF images are allowed."
            ),
           false
        );
    }
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }

});

export default upload;