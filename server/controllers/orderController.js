import asyncHandler from "express-async-handler";

import Order   from "../models/Order.js";
import Product from "../models/Product.js";
import Cart   from "../models/Cart.js";
import User   from "../models/User.js";

// @desc    Place new order
// @route   POST /api/orders
// @access  Private

const placeOrder = asyncHandler(async (req, res) => {
    const {
        address,city,pincode,
        paymentMethod
    } = req.body;

    const cart = await Cart.find({ user: req.user._id })
        .populate("product");

    // console.log("cart length = ",cart.length);

    if (!cart || cart.length === 0) {
        res.status(400);
        throw new Error("Cart is empty");
    }
    

    let totalPrice = 0;

    const orderItems = [];

    // console.log("cart =",cart);
    for (const item of cart) {

        const product = await Product.findById(item.product._id);

        if (!product) {
            res.status(404);
            throw new Error("Product not found");
        }

        if (product.stock < item.quantity) {
            res.status(400);
            throw new Error(`${product.name} is out of stock`);
        }

        orderItems.push({
            product: product._id,
            name: product.name,
            image: product.images[0]?.url || "",
            quantity: item.quantity,
            price: product.price
        });

        totalPrice += product.price * item.quantity;
    }

    const taxPrice = Number((totalPrice * 0.18).toFixed(2));

    const shippingPrice = totalPrice > 500 ? 0 : 50;

    const finalPrice =
        totalPrice +
        taxPrice +
        shippingPrice;

   const shippingAddress = {
      address,
      city,
      pincode
   }

    const order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: totalPrice,
        taxPrice,
        shippingPrice,
        totalPrice: finalPrice
    });

    for (const item of orderItems) {

        await Product.findByIdAndUpdate(
            item.product,
            {
                $inc: {
                    stock: -item.quantity
                }
            }
        );
    }

    await Cart.deleteMany({
    user: req.user._id
    });
    

    res.status(201).json(order);
});



// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private

const getMyOrders = asyncHandler(async (req, res) => {
   try{
    const orders = await Order.find({
        user: req.user._id
    }).populate("orderItems.product")
        .sort({ createdAt: -1 });

    res.status(200).json({
       success:true,
        orders,
   });
}
catch(err){
    res.status(400).json({
        success:false,
        message:err.message
    })
}

});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("orderItems.product", "name images price");

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }
    // console.log("order = ",order);

    // Admin can access every order
    // Normal user can access only his own order

    if (
        req.user.role !== "admin" &&
        order.user._id.toString() !== req.user._id.toString()
    ) {
        res.status(403);
        throw new Error("Not authorized to access this order");
    }

    res.status(200).json({
        success:true,
        order
    });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin

const getAllOrders = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

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

    res.json({
        totalOrders,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        revenue:
            totalRevenue.length > 0
                ? totalRevenue[0].revenue
                : 0,
        orders
    });

});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Admin

const updateOrderStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;


    console.log("status = ",status);
    console.log("id = ",req.params.id);
    const allowedStatus = [
        "Confirmed",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled"
    ];

    if (!allowedStatus.includes(status)) {
        res.status(400);
        throw new Error("Invalid order status");
    }

    const order = await Order.findById(req.params.id);

    console.log("order = ",order);
    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    if (order.orderStatus === "Cancelled") {
        res.status(400);
        throw new Error("Cancelled order cannot be updated");
    }

    order.orderStatus = status;
    console.log("status =",status.orderStatus);
    
    if (status === "Delivered") {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
        success:true,
        order
    });

});


// @desc    Mark order as paid
// @route   PUT /api/orders/:id/pay
// @access  Private

const markOrderAsPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    if (
        req.user.role !== "admin" &&
        order.user.toString() !== req.user._id.toString()
    ) {
        res.status(403);
        throw new Error("Not authorized");
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    order.paymentResult = {
        id: req.body.id || "",
        status: req.body.status || "Paid",
        update_time: req.body.update_time || new Date().toISOString(),
        email_address: req.body.email_address || ""
    };

    await order.save();

    res.json(order);

});


// @desc    Mark order as delivered
// @route   PUT /api/orders/:id/deliver
// @access  Admin

const markOrderAsDelivered = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    if (order.orderStatus === "Cancelled") {
        res.status(400);
        throw new Error("Cancelled order cannot be delivered");
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.orderStatus = "Delivered";

    await order.save();

    res.json(order);

});


// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private

const cancelOrder = asyncHandler(async (req, res) => {
    console.log("id = ",req.params.id);
    const order = await Order.findById(req.params.id);
    console.log("order = ",order);
    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    if (
        req.user.role !== "admin" &&
        order.user.toString() !== req.user._id.toString()
    ) {
        res.status(403);
        throw new Error("Not authorized");
    }

    if (order.orderStatus === "Delivered") {
        res.status(400);
        throw new Error("Delivered order cannot be cancelled");
    }

    if (order.orderStatus === "Cancelled") {
        res.status(400);
        throw new Error("Order already cancelled");
    }

    // Restore stock
    for (const item of order.orderItems) {

        await Product.findByIdAndUpdate(
            item.product,
            {
                $inc: {
                    stock: item.quantity
                }
            }
        );

    }

    order.orderStatus = "Cancelled";

    await order.save();

    res.json({
        message: "Order cancelled successfully",
        order
    });

});

// @desc    Get dashboard statistics
// @route   GET /api/orders/dashboard
// @access  Admin

const getDashboardStats = asyncHandler(async (req, res) => {

    const totalOrders = await Order.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const revenueData = await Order.aggregate([
        {
            $match: {
                isPaid: true
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$totalPrice"
                }
            }
        }
    ]);

    const totalRevenue =
        revenueData.length > 0
            ? revenueData[0].totalRevenue
            : 0;

    const recentOrders = await Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(5);

    res.json({
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        recentOrders
    });

});

// @desc    Monthly sales statistics
// @route   GET /api/orders/stats/monthly
// @access  Admin

const getMonthlySales = asyncHandler(async (req, res) => {

    const sales = await Order.aggregate([

        {
            $match: {
                isPaid: true
            }
        },

        {
            $group: {
                _id: {
                    year: {
                        $year: "$createdAt"
                    },
                    month: {
                        $month: "$createdAt"
                    }
                },
                totalSales: {
                    $sum: "$totalPrice"
                },
                orders: {
                    $sum: 1
                }
            }
        },

        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1
            }
        }

    ]);

    res.json(sales);

});

// @desc    Order status summary
// @route   GET /api/orders/stats/status
// @access  Admin

const getOrderStatusSummary = asyncHandler(async (req, res) => {

    const statusSummary = await Order.aggregate([

        {
            $group: {
                _id: "$orderStatus",
                count: {
                    $sum: 1
                }
            }
        }

    ]);

    res.json(statusSummary);

});

// @desc    Top selling products
// @route   GET /api/orders/stats/top-products
// @access  Admin

const getTopSellingProducts = asyncHandler(async (req, res) => {

    const products = await Order.aggregate([

        {
            $unwind: "$orderItems"
        },

        {
            $group: {
                _id: "$orderItems.product",
                totalSold: {
                    $sum: "$orderItems.quantity"
                }
            }
        },

        {
            $sort: {
                totalSold: -1
            }
        },

        {
            $limit: 10
        }

    ]);

    await Product.populate(products, {
        path: "_id",
        select: "name price images category"
    });

    res.json(products);

});

// @desc    Daily sales report
// @route   GET /api/orders/stats/daily
// @access  Admin

const getDailySales = asyncHandler(async (req, res) => {

    const sales = await Order.aggregate([

        {
            $match: {
                isPaid: true
            }
        },

        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt"
                    }
                },
                revenue: {
                    $sum: "$totalPrice"
                },
                orders: {
                    $sum: 1
                }
            }
        },

        {
            $sort: {
                "_id": 1
            }
        }

    ]);

    res.json(sales);

});



export {
    placeOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    markOrderAsPaid,
    markOrderAsDelivered,
    cancelOrder,
    getDashboardStats,
    getMonthlySales,
    getOrderStatusSummary,
    getTopSellingProducts,
    getDailySales
};






