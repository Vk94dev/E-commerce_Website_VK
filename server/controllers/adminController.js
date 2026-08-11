import User from "../models/User.js"
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getDashboard = async (req,res)=>{
    try{
      const totalOrders = await Order.countDocuments();
      const totalProducts = await Product.countDocuments();
      const totalUsers = await User.countDocuments();
      const totalRevenue = await Order.aggregate([
              {
                  $match: {
                    orderStatus:"Delivered"
                  }
              },
              {
                  $group: {
                      _id: null,
                      revenue: {
                          $sum: "$totalPrice"
                      }
                  }
              }
          ]);
      res.status(200).json({
        success:true,
        totalOrders,
        totalProducts,
        totalUsers,
        totalRevenue
      })

    }
    catch(err){
        res.status(500).json({
            success:false,
            "message":err.message
        })
    }
}

  