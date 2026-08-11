import express from "express";

import {

createCategory,
getCategories,
updateCategory,
deleteCategory

}
from "../controllers/categoryController.js";


import {
protect,admin
}
from "../middleware/authMiddleware.js";



const router = express.Router();



// Admin create category

router.post(
"/",
protect,
admin,
createCategory
);



// Get categories

router.get(
"/",
getCategories
);



// Update category

router.put(

"/:id",

protect,

admin,

updateCategory

);




// Delete category

router.delete(

"/:id",

protect,

admin,

deleteCategory

);



export default router;