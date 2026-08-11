import { CheckCircle2, ShoppingBag, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]  flex items-center justify-center px-5">

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--card)]  border border-[var(--border)]  rounded-2xl shadow-xl p-10 max-w-lg w-full text-center"
            >

                <CheckCircle2
                    size={90}
                    className="mx-auto text-green-500"
                />

                <h1 className="text-4xl font-bold mt-6">

                    Order Placed Successfully

                </h1>

                <p className="text-[var(--secondary)] mt-4">

                    Thank you for shopping with us.

                    <br />

                    Your order has been received and is being processed.

                </p>

                <div className="bg-[var(--bg)]  border border-[var(--border)] text-[var(--text)] rounded-xl mt-8 p-5">

                    <h3 className="font-semibold text-lg">

                        Estimated Delivery

                    </h3>

                    <p className="text-green-600 font-bold mt-2">

                        3 - 5 Business Days

                    </p>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">

                    <button
                        onClick={() => navigate("/orders")}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    >
                        <Package size={20}/>
                        My Orders
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg"
                    >
                        <ShoppingBag size={20}/>
                        Continue Shopping
                    </button>

                </div>

            </motion.div>

        </div>

    );

};

export default OrderSuccess;

