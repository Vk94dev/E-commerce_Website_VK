import { useEffect, useState } from "react";
import { getMyOrders } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";

const Orders = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

//     const orders = [
//   {
//     _id: "ORD1001",
//     createdAt: "2026-08-01T10:30:00Z",
//     orderStatus: "Delivered",
//     paymentStatus: "Paid",
//     totalPrice: 52999,
//     orderItems: [
//       {
//         _id: "1",
//         quantity: 1,
//         price: 49999,
//         product: {
//           _id: "P101",
//           name: "Apple iPhone 16",
//           images: [
//             {
//               url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
//             }
//           ]
//         }
//       },
//       {
//         _id: "2",
//         quantity: 1,
//         price: 3000,
//         product: {
//           _id: "P102",
//           name: "Wireless Earbuds",
//           images: [
//             {
//               url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600"
//             }
//           ]
//         }
//       }
//     ]
//   },

//   {
//     _id: "ORD1002",
//     createdAt: "2026-07-28T14:20:00Z",
//     orderStatus: "Shipped",
//     paymentStatus: "Paid",
//     totalPrice: 4499,
//     orderItems: [
//       {
//         _id: "3",
//         quantity: 1,
//         price: 2499,
//         product: {
//           _id: "P103",
//           name: "Nike Running Shoes",
//           images: [
//             {
//               url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
//             }
//           ]
//         }
//       },
//       {
//         _id: "4",
//         quantity: 2,
//         price: 1000,
//         product: {
//           _id: "P104",
//           name: "Sports T-Shirt",
//           images: [
//             {
//               url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
//             }
//           ]
//         }
//       }
//     ]
//   },

//   {
//     _id: "ORD1003",
//     createdAt: "2026-07-20T09:00:00Z",
//     orderStatus: "Processing",
//     paymentStatus: "Pending",
//     totalPrice: 18999,
//     orderItems: [
//       {
//         _id: "5",
//         quantity: 1,
//         price: 18999,
//         product: {
//           _id: "P105",
//           name: "Samsung Smart TV",
//           images: [
//             {
//               url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600"
//             }
//           ]
//         }
//       }
//     ]
//   },

//   {
//     _id: "ORD1004",
//     createdAt: "2026-07-15T16:45:00Z",
//     orderStatus: "Cancelled",
//     paymentStatus: "Refunded",
//     totalPrice: 799,
//     orderItems: [
//       {
//         _id: "6",
//         quantity: 1,
//         price: 799,
//         product: {
//           _id: "P106",
//           name: "Bluetooth Mouse",
//           images: [
//             {
//               url: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600"
//             }
//           ]
//         }
//       }
//     ]
//   }
// ];


    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const res = await getMyOrders();

                setOrders(res.orders);

            } catch (error) {

                console.log(error.message);

            } finally {

                setLoading(false);

            }

        };

        fetchOrders();

    }, []);

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <h2 className="text-2xl font-semibold">
                    Loading...
                </h2>

            </div>

        );

    }

    if (!orders.length) {

        return (

            <div className="flex flex-col items-center justify-center h-[80vh]">

                <Package size={80} className="text-gray-400"/>

                <h2 className="text-2xl font-bold mt-4">
                    No Orders Found
                </h2>

                <p className="text-gray-500 mt-2">
                    You haven't placed any order yet.
                </p>

                <button
                    onClick={() => navigate("/shop")}
                    className="mt-6 bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
                >
                    Start Shopping
                </button>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-4xl font-bold mb-8">
                My Orders
            </h1>
            <button onClick={()=>navigate(-1)} className="text-xl text-blue-700 py-1.5 px-4 mb-7 bg-blue-200 hover:bg-gray-200 rounded-md border">
                Back
            </button>
            </div>
           

            <div className="space-y-8  ">

                {orders.map((order) => (

                    <div
                        key={order._id}
                        className="bg-[var(--card)]  border border-[var(--border)] rounded-xl shadow-md p-6"
                    >

                        <div className="flex flex-col md:flex-row justify-between">

                            <div>

                                <h2 className="font-bold text-lg">
                                    Order ID
                                </h2>

                                <p className="text-[var(--secondary)]">
                                    {order._id}
                                </p>

                            </div>

                            <div>

                                <h2 className="font-bold">
                                    Order Date
                                </h2>

                                <p>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>

                            </div>

                            <div>

                                <h2 className="font-bold">
                                    Status
                                </h2>

                                <span
                                    className={`px-3 py-1 rounded-full text-white
                                    ${
                                        order.orderStatus === "Delivered"
                                            ? "bg-green-600"
                                            : order.orderStatus === "Shipped"
                                            ? "bg-blue-600"
                                            : order.orderStatus === "Processing"
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                >
                                    {order.orderStatus}
                                </span>

                            </div>

                            <div>

                                <h2 className="font-bold">
                                    Payment
                                </h2>

                                <span
                                    className={`px-3 py-1 rounded-full text-white
                                    ${
                                        order.paymentStatus === "Paid"
                                            ? "bg-green-600"
                                            : "bg-red-500"
                                    }`}
                                >
                                    {order.paymentStatus}
                                </span>

                            </div>

                        </div>

                        <hr className="my-6"/>

                        <div className="space-y-5">

                            {order.orderItems.map((item) => (

                                <div
                                    key={item.product._id}
                                    className="flex items-center gap-5"
                                >

                                    <img
                                        src={item.product?.images?.[0]?.url}
                                        alt={item.product.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">

                                        <h2 className="font-semibold text-lg">
                                            {item.product.name}
                                        </h2>

                                        <p className="text-[var(--secondary)]">
                                            Quantity : {item.quantity}
                                        </p>

                                    </div>

                                    <div className="font-bold text-lg">

                                        ₹{item.price}

                                    </div>

                                </div>

                            ))}

                        </div>

                        <hr className="my-6"/>

                        <div className="flex justify-between items-center">

                            <h2 className="text-2xl font-bold">

                                Total : ₹{order.totalPrice}

                            </h2>

                            <button
                                onClick={() =>
                                    navigate(`/orders/${order._id}`)
                                }
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                            >
                                View Details
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default Orders;

































