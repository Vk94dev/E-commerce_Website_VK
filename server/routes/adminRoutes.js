import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { admin } from "../middleware/authMiddleware.js"
import upload from "../middleware/uploadMiddleware.js";
import Product from "../models/Product.js";
import Category from "../models/category.js";
// import {} from "../utils/cloudinaryUpload.js"
import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";
import { getDashboard } from "../controllers/adminController.js";
// import { getCategories } from "../controllers/categoryController.js";


const router = express.Router();

router.get("/dashboard",protect,admin,getDashboard);

router.post("/product/create",protect,admin,upload.array("images",5), async (req,res)=>{
    try{  
           const {name , category, price , stock, description} = req.body;
    
              let images = [];

            for (const file of req.files) {

                const result = await cloudinary.uploader.upload(file.path,{
                    folder: "products"
                });

                images.push({
                    public_id: result.public_id,
                    url: result.secure_url
                });
            }
            const product = await Product.create({
                name,
                category,
                price,
                stock,
                description,
                images
            });

           const existCategory = await Category.findOne({
            name:category
           })

           if(!existCategory){
            await Category.create({
                name:category
            })
           }
        
        res.status(201).json({
            success:true,
            message:"product is created",
            product,
        })
    }
 catch(error){
    res.json({
        success: false,
        message: error.message,
    })
 }
});




router.get("/users",protect,admin, async (req,res)=>{
    try{
        
            const page = Number(req.query.page) || 1;
        
            const limit = Number(req.query.limit) || 10;
        
            const skip = (page - 1) * limit;
        
            const totalUsers = await User.countDocuments();
        
            const users = await User.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
        

        
            res.json({
                totalUsers,
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                users
            });

    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
})

export default router;






