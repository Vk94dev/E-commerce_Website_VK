import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    CheckCircle,
    Truck,
    Package,
    CreditCard,
    MapPin,
    Receipt
} from "lucide-react";
import { useEffect, useState } from "react";
import { cancelOrder, getOrderById } from "../../api/api";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import toast from "react-hot-toast"


const OrderDetails = () => {

    const navigate = useNavigate();

  const [order,setOrder] =  useState(null);

    const { id } = useParams();

    // Replace with API later
    // const order = {
    //     _id: id,
    //     createdAt: "01 Aug 2026",
    //     status: "Shipped",
    //     paymentMethod: "Cash on Delivery",
    //     paymentStatus: "Pending",

    //     shippingAddress: {
    //         name: "Amit Kumar",
    //         phone: "9876543210",
    //         address: "45 MG Road",
    //         city: "Surat",
    //         state: "Gujarat",
    //         pinCode: "395007"
    //     },

    //     items: [
    //         {
    //             _id: 1,
    //             name: "iPhone 16 Pro",
    //             image:
    //                 "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    //             price: 95000,
    //             quantity: 2
    //         },
    //         {
    //             _id: 2,
    //             name: "Apple Watch",
    //             image:
    //                 "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    //             price: 25000,
    //             quantity: 1
    //         }
    //     ]
    // };


    useEffect(()=>{
        const fetchOrderById = async ()=>{
            try{
                const res = await getOrderById(id);

                 setOrder(res.order);
            }
            catch(err){
                console.log(err.message);
            }
        }
        fetchOrderById();
    },[])


    const downloadInvoice = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("E-Commerce Invoice", 70, 20);

    doc.setFontSize(12);

    doc.text(`Order ID : ${order._id}`, 15, 40);

    doc.text(
        `Order Date : ${new Date(order.createdAt).toLocaleDateString()}`,
        15,
        50
    );

    doc.text(
        `Customer : ${order.user.name}`,
        15,
        60
    );

    doc.text(
        `Email : ${order.user.email}`,
        15,
        70
    );

    doc.text(
        `Address : ${order.shippingAddress.address}`,
        15,
        80
    );

    autoTable(doc, {

        startY: 95,

        head: [[
            "Product",
            "Price",
            "Qty",
            "Total"
        ]],

        body: order.orderItems.map(item => [

            item.product.name,

            `Rs. ${item.price}`,

            item.quantity,

            `Rs. ${item.price * item.quantity}`

        ])

    });

    let y = doc.lastAutoTable.finalY + 15;

    doc.text(`Subtotal : Rs. ${order.itemsPrice}`,15,y);

    doc.text(`GST (18%) : Rs. ${order.taxPrice}`,15,y+10);

    doc.text(`Shipping  : Rs. ${order.shippingPrice}`,15,y+20);

    doc.text(`Grand Total : Rs. ${order.totalPrice}`,15,y+35);

   
//     const img = new Image();

// img.src = order.orderItems[0].product.images[0].url;

// img.onload = () => {

//     doc.addImage(img,"JPEG",150,20,35,35);

//     doc.save("invoice.pdf");

// };

    doc.save(`Invoice-${order._id}.pdf`);

};


const handleCancleOrder = async (id)=>{
    try{
       const res =  await cancelOrder(id);
       if(res){
        toast.success("Order Cancelled")
        navigate(`/orders`)
       }
    }
    catch(err){
        console.log(err.message);
    }
}



    if(!order){
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        )
    }

    return (

        <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-10">

            <div className="max-w-7xl mx-auto bg-[var(--card)] ">

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className=" rounded-xl shadow-lg p-8 "
                >
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-4xl font-bold mb-8">
                        Order Details
                    </h1>
                    <button onClick={()=>navigate(-1)} className="text-blue-700 py-1.5 px-4 border rounded-md text-xl bg-blue-200 hover:bg-gray-200 mb-5"> 
                        Back
                    </button>
                    </div>
                    

                    {/* Order Info */}

                    <div className="grid md:grid-cols-3 gap-6">

                        <div>

                            <h3 className="font-semibold">

                                Order ID

                            </h3>

                            <p>{order?._id}</p>

                        </div>

                        <div>

                            <h3 className="font-semibold">

                                Order Date

                            </h3>

                            <p>{order.createdAt.split('T')[0]}</p>

                        </div>

                        <div>

                            <h3 className="font-semibold">

                                Status

                            </h3>

                            <span className="bg-blue-600 text-white px-4 py-1 rounded-full">

                                {order.orderStatus}

                            </span>

                        </div>

                    </div>

                    <hr className="my-8"/>

                    {/* Shipping */}

                    <div>

                        <h2 className="text-2xl font-bold flex items-center gap-2">

                            <MapPin/>

                            Shipping Address

                        </h2>

                        <div className="mt-4 text-[var(--secondary)]">

                            <p>{order.shippingAddress?.name}</p>

                            <p>{order.shippingAddress?.phone}</p>

                            <p>{order.shippingAddress.address}</p>

                            <p>

                                {order.shippingAddress.city},

                                {order.shippingAddress?.state}

                            </p>

                            <p>{order.shippingAddress.pincode}</p>

                        </div>

                    </div>

                    <hr className="my-8"/>

                    {/* Payment */}

                    <div>

                        <h2 className="text-2xl font-bold flex items-center gap-2">

                            <CreditCard/>

                            Payment

                        </h2>

                        <p className="mt-3">

                            Method :

                            <strong>

                                {" "}
                                {order.paymentMethod}

                            </strong>

                        </p>

                        <p>

                            Status :

                            <span className="text-orange-600 font-semibold">

                                {" "}
                                {order.paymentStatus}

                            </span>

                        </p>

                    </div>

                    <hr className="my-8"/>

                    {/* Products */}

                    <h2 className="text-2xl font-bold mb-6">

                        Ordered Products

                    </h2>

                    {

                        order.orderItems.map((item)=>(

                            <div
                                key={item.product._id}
                                className="flex gap-6 border rounded-lg p-4 mb-5"
                            >

                                <img
                                    src={item.image}
                                    className="w-28 h-28 object-cover rounded-lg"
                                />

                                <div className="flex-1">

                                    <h3 className="text-xl font-semibold">

                                        {item.name[0].toUpperCase()+item.name.slice(1).toLowerCase()}

                                    </h3>

                                    <p>

                                        Price : ₹ {item.price}

                                    </p>

                                    <p>

                                        Quantity : {item.quantity}

                                    </p>

                                    <p className="font-bold">

                                        Total :

                                        ₹ {item.price*item.quantity}

                                    </p>

                                </div>

                            </div>

                        ))

                    }

                    <hr className="my-8"/>

                    {/* Price Details */}

                    <div className="bg-[var(--bg)] rounded-xl p-6">

                        <h2 className="text-2xl font-bold flex items-center gap-2">

                            <Receipt/>

                            Price Details

                        </h2>

                        <div className="space-y-3 mt-6">

                            <div className="flex justify-between">

                                <span>itemsPrice</span>

                                <span>₹ {order.itemsPrice}</span>

                            </div>

                            <div className="flex justify-between">

                                <span>GST (18%)</span>

                                <span>₹ {order.taxPrice}</span>

                            </div>

                            <div className="flex justify-between">

                                <span>Shipping Charge</span>

                                <span>

                                    {order?.shippingPrice===0 ? "Free" : `₹${order.shippingPrice}`}

                                </span>

                            </div>

                            <div className="flex justify-between text-green-600">

                                <span>Discount {order.itemsPrice>=1000?"(10%)":"(0%)"}</span>

                                <span>₹ {order.itemsPrice>=1000?(order.itemsPrice*10)/100:0}</span>

                            </div>

                            <hr/>

                            <div className="flex justify-between text-2xl font-bold">

                                <span>Total</span>

                                <span>

                                    ₹{order.totalPrice-((order.itemsPrice)>=1000?(order.itemsPrice*10)/100:0)}

                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Timeline */}

                    <div className="mt-10 mb-4">

                        <h2 className="text-2xl font-bold mb-5">

                            Order Timeline

                        </h2>

                        <div className="flex flex-wrap gap-8">

                            <div className="flex items-center gap-2 text-green-600">

                                <CheckCircle/>

                                Order Placed

                            </div>

                            <div className="flex items-center gap-2 text-green-600">

                                <Package/>

                                Packed

                            </div>

                            <div className="flex items-center gap-2 text-blue-600">

                                <Truck/>

                                Shipped

                            </div>

                        </div>

                    </div>

                    <p className="text-lg">
                    Status :
                   <span className="text-blue-600 font-bold">
                     {order.orderStatus}
                    </span>
                     </p>

                    <div className="mt-10 flex gap-5">

                        <button onClick={()=>handleCancleOrder(order?._id)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg">

                            Cancel Order

                        </button>

                         <button
        onClick={() => navigate(`/orders/${order._id}/track-order`)}
        className="bg-amber-900 hover:bg-amber-800 text-white px-6 py-3 rounded-lg"
         >
        Track Order
         </button>

                      

                          <button onClick={downloadInvoice} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
                             Download Invoice
                         </button>


                        <button onClick={()=>navigate("/shop")} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">

                            Buy Again

                        </button>

                    </div>

                </motion.div>

            </div>

        </div>

    );


};

export default OrderDetails;

