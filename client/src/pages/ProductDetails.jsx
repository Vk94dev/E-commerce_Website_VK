import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { addToCart, addWishlistItem, getProductById } from "../api/api";
import {addToWishlistSuccess} from "../redux/slices/wishlistSlice"
import { useDispatch } from "react-redux";
import { addToCartSuccess } from "../redux/slices/cartSlice";

import ReviewSection from "../components/ReviewSection";

import { FaStar, FaRegStar } from "react-icons/fa";

const ProductDetails = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();

 const dispatch = useDispatch();

  const [product, setProduct] = useState(null);


const HandleAddCart =  async (e)=>{
  try{
    e.preventDefault();
      const res =  await addToCart(id,1);
      if(res){
          dispatch(addToCartSuccess(id));
          navigate("/cart");
         }
  }
  catch(err){
    console.log(err.message);
  }
}

const handleWishlist = async (e)=>{
    try{
      e.preventDefault();
       const res = await addWishlistItem(id);
       if(res){
        console.log(res.product)
         dispatch(addToWishlistSuccess(id));
        navigate("/wishlist");
       }

    }
    catch(err){
      console.log(err.message);
    }
}

const handleReview = (e)=>{
  e.preventDefault();
  navigate(`/review/${id}`)
}


  /* -----------------------------
     Dummy product data (replace with API later)
  ------------------------------ */

  useEffect(() => {
    // const data = [
    //   {
    //     id: "6a6cc9713c6b81b91f908097",
    //     name: "Wireless Headphones",
    //     price: 1999,
    //     image:
    //       "https://images.unsplash.com/photo-1580894908361-967195033215",
    //     description:
    //       "High quality wireless headphones with noise cancellation.",
    //   },
    //   {
    //     id: 2,
    //     name: "Smart Watch",
    //     price: 3499,
    //     image:
    //       "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    //     description:
    //       "Track your fitness and notifications with this smart watch.",
    //   },
    //   {
    //     id: 3,
    //     name: "Gaming Mouse",
    //     price: 999,
    //     image:
    //       "https://images.unsplash.com/photo-1527814050087-3793815479db",
    //     description:
    //       "Ergonomic gaming mouse with RGB lighting.",
    //   },
    // ];

    const fetchProduct = async ()=>{
       try{
         const res = await getProductById(id);
         
        setProduct(res.product);
       }
       catch(err){
          console.log(err.message);
       }
    }
    fetchProduct();

    // const found = data.find((item) => item.id === Number(id));

    // setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Product not found
      </div>
    );
  }





  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-[var(--text)] bg-[var(--bg)] ">

      <button
        onClick={() => navigate(-1)}
        // className="mb-6 border p-2 rounded-md bg-gray-200 text-blue-600 hover:bg-blue-100"
        className="mb-6 border py-2 px-4 rounded-xl bg-blue-100 text-blue-600 hover:bg-gray-200"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* =========================
            IMAGE SECTION
        ========================= */}

        <motion.img
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-xl shadow-md"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        />

        {/* =========================
            DETAILS SECTION
        ========================= */}

        <motion.div
           className="w-full h-[400px] p-5 rounded-xl shadow-md bg-[var(--card)]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >

          <h1 className="text-3xl font-bold">
            {product.name.charAt(0).toUpperCase()+product.name.slice(1).toLowerCase()}
          </h1>

          <p className="text-[var(--secondary)] mt-4">
            {product.description.charAt(0).toUpperCase()+product.description.slice(1).toLowerCase()}
          </p>

          <p className="text-2xl text-blue-600 font-bold mt-6">
            ₹{product.price}
          </p>
           
           <ReviewSection productId={product._id}/>


          {/* Buttons */}

          <div className="flex gap-4 mt-6  ">

            <button
              // onClick={() => alert("Added to cart")}
              onClick={HandleAddCart}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Add to Cart
            </button>

            <button
              onClick={handleWishlist}
              className="border px-6 py-3 rounded-md text-black  bg-gray-200 hover:bg-gray-300"
            >
              ❤️ Wishlist
            </button>

            <button
              onClick={handleReview}
              className="border px-6 py-3 rounded-md text-white  bg-amber-500 hover:bg-amber-600 flex flex-row justify-between items-center gap-2"
            >
               <FaStar size={22} />
           {/* <FaRegStar size={22} /> */}
              Review
            </button>

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default ProductDetails;

