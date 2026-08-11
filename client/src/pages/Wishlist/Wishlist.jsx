import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getWishlist, moveToCart, removeWishlistItem } from "../../api/api";
import { useDispatch } from "react-redux";
import { removeFromWishlistSuccess, setWishlist, wishlistStart } from "../../redux/slices/wishlistSlice";


const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* -----------------------------
     Dummy Wishlist Data
     (replace with Redux/API later)
  ------------------------------ */

  // const [wishlistItems, setWishlistItems] = useState([
  //   {
  //     id: 1,
  //     name: "Wireless Headphones",
  //     price: 1999,
  //     image:
  //       "https://images.unsplash.com/photo-1580894908361-967195033215",
  //   },
  //   {
  //     id: 2,
  //     name: "Smart Watch",
  //     price: 3499,
  //     image:
  //       "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  //   },
  //   {
  //     id: 3,
  //     name: "Gaming Mouse",
  //     price: 999,
  //     image:
  //       "https://images.unsplash.com/photo-1527814050087-3793815479db",
  //   },
  // ]);

  dispatch(wishlistStart());

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(()=>{
     const fetchWishlist = async ()=>{
          try{

             const res =  await getWishlist();
            //  console.log(res?.wishlist);
            
              setWishlistItems(res.wishlist);
              dispatch(setWishlist(res?.wishlist));
            

          }
          catch(err){
            console.log(err.message);
          }
     }
     fetchWishlist();
  },[])


  const removeWishlist = async (id) => {
   try{
    // e.preventDefault();
      const res = await removeWishlistItem(id);
    if(res){
      dispatch(removeFromWishlistSuccess(id))
      setWishlistItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  }
   } 
    catch(err){
     console.log(err.message);
   }
  };

  /* -----------------------------
     Move to cart (UI only)
  ------------------------------ */

  const handleMoveToCart = async (id) => {
     try{
      const res = await moveToCart(id);
      if(res){
        dispatch(removeFromWishlistSuccess(id));
        setWishlistItems((prev) =>
         prev.filter((item) => item._id !== id)
       );
      }
     }
     catch(err){
      console.log(err.message);
     }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-[var(--text)] bg-[var(--bg)]">
     <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold mb-8">
        My Wishlist ❤️
      </h1>
      <button onClick={()=>navigate(-1)} className="bg-blue-200 hover:bg-gray-200 border rounded-md text-blue-700 text-xl py-1.5 px-4 mb-5">
        Back
      </button>
     </div>
      

      {/* Empty state */}

      {!wishlistItems.length ? (
        <div className="text-center py-20 text-[var(--secondary)]">
          Your wishlist is empty
          <br />
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {wishlistItems.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.03 }}
              className=" shadow-md rounded-xl overflow-hidden bg-[var(--card)] border border-[var(--border)] "
            >
              
              <img
                src={item.product.images?.[0]?.url}
                alt={item.product.name}
                onClick={()=>navigate(`/product/${item.product._id}`)}
                className="h-48 w-full object-cover"
              />
            

              <div className="p-4">

                <h2 className="font-semibold text-xl ">
                  {item.product.name.charAt(0).toUpperCase()+item.product.name.slice(1).toLowerCase()}
                </h2>

                <p className="text-blue-600 font-bold mt-2">
                  ₹ {item.product.price}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => handleMoveToCart(item._id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => removeWishlist(item._id)}
                    className="flex-1 border py-2 rounded-md text-md text-red-500 bg-gray-200 hover:bg-gray-300"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Wishlist;

