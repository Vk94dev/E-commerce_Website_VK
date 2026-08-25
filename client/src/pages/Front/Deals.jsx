import { useState } from "react";
import { Flame, Clock3, ShoppingCart, Star } from "lucide-react";
import DealTimer from "../../components/DealTimer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



const  Deals = ()=> {

    const navigate = useNavigate();

    const deals = [
    {
        id: 1,
        name: "Wireless Headphones",
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
        price: 1999,
        oldPrice: 3999,
        discount: 50,
        rating: 4.8
    },
    {
        id: 2,
        name: "Gaming Mouse",
        image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=700",
        price: 999,
        oldPrice: 1999,
        discount: 50,
        rating: 4.7
    },
    {
        id: 3,
        name: "Smart Watch",
        image:
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=700",
        price: 3499,
        oldPrice: 6999,
        discount: 50,
        rating: 4.9
    },
    {
        id: 4,
        name: "Laptop",
        image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",
        price: 55999,
        oldPrice: 69999,
        discount: 20,
        rating: 4.8
    },
    {
        id: 5,
        name: "Sneakers",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
        price: 2499,
        oldPrice: 4999,
        discount: 50,
        rating: 4.6
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        image:
            "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=700",
        price: 1799,
        oldPrice: 2999,
        discount: 40,
        rating: 4.7
    }
];




    const [products] = useState(deals);

    return (

        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

            {/* Hero */}

            <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-white py-16">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex items-center gap-4">

                        <Flame size={45} />

                        <div>

                            <h1 className="text-5xl font-bold">

                                Today's Hot Deals

                            </h1>

                            <p className="mt-3 text-lg">

                                Hurry! Limited Time Offers.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Offer Banner */}

            <div className="max-w-7xl mx-auto mt-8 text-[var(--text)]">

                <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-lg p-6 flex flex-col md:flex-row justify-between items-center">

                    <div>

                        <h2 className="text-3xl font-bold ">

                            Mega Sale

                        </h2>

                        <p className="text-[var(--secondary)] mt-2">

                            Up to 70% OFF on Electronics

                        </p>

                    </div>

                    {/* <div className="flex items-center gap-2 mt-4 md:mt-0">

                        <Clock3 className="text-red-600"/>

                        <span className="font-semibold">

                            Ends in 12:30:45

                        </span>

                    </div> */}

                    {<DealTimer />}

                </div>

            </div>

            {/* Products */}

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                    {products.map((product)=>(

                        <motion.div
                            key={product.id}
                             whileHover={{ scale: 1.03 }}
                            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
                           
                        >

                            <div className="relative cursor-pointer"  onClick={()=>navigate(`/product/${product.id}`)}>

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-64 w-full object-cover"
                                />

                                <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">

                                    {product.discount}% OFF

                                </span>

                            </div>

                            <div className="p-5">

                                <h2 className="text-xl font-bold">

                                    {product.name}

                                </h2>

                                <div className="flex items-center gap-1 mt-2">

                                    <Star
                                        fill="gold"
                                        className="text-yellow-500"
                                        size={18}
                                    />

                                    {product.rating}

                                </div>

                                <div className="mt-3">

                                    <span className="text-2xl font-bold text-blue-600">

                                        ₹{product.price}

                                    </span>

                                    <span className="ml-3 text-[var(--secondary)] line-through">

                                        ₹{product.oldPrice}

                                    </span>

                                </div>

                                <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2">

                                    <ShoppingCart size={20}/>

                                    Add To Cart

                                </button>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default Deals;


