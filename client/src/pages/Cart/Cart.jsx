// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { addToCart,getCart } from "../api/api";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch,useSelector } from "react-redux";
// import { cartStart , updateQuantitySuccess } from "../redux/slices/cartSlice";

// const Cart = ()=> {

//   const dispatch =  useDispatch();

//   dispatch(cartStart());
  
//   const totalPrice = useSelector((state)=>state.cart.itemsPrice);
//   const totalQty = useSelector((state)=>state.cart.totalQuantity);

//   const navigate = useNavigate();

//  const [cartItems, setCartItems] = useState([]);

// useEffect(()=>{
//    const fetchCart =async ()=>{
//     try{
//         const res = await getCart();
//         console.log(res.cart);
//         setCartItems(res.cart);
//     }
//     catch(err){
//       console.log(err.message);
//     }
//     }
//     fetchCart();
// },[])

//   /* -----------------------------
//      Dummy Cart Data (replace with Redux/API later)
//   ------------------------------ */

//   // const [cartItems, setCartItems] = useState([
//   //   {
//   //     id: 1,
//   //     name: "Wireless Headphones",
//   //     price: 1999,
//   //     quantity: 1,
//   //     image:
//   //       "https://images.unsplash.com/photo-1580894908361-967195033215",
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "Smart Watch",
//   //     price: 3499,
//   //     quantity: 2,
//   //     image:
//   //       "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
//   //   },
//   // ]);

//   const CheckoutHandler = (e)=>{
//       e.preventDefault();
//       navigate("/checkout");     
//   }

//   /* -----------------------------
//      Quantity Handlers
//   ------------------------------ */

//   const increaseQty = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQty = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   /* -----------------------------
//      Remove Item
//   ------------------------------ */

//   const removeItem = (id) => {
//     setCartItems((prev) =>
//       prev.filter((item) => item._id !== id)
//     );
//   };

//   /* -----------------------------
//      Total Price
//   ------------------------------ */

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   // useEffect((product)=>{
//   //  addToCart(product._id, 1);
//   // },[])

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">

//       <h1 className="text-3xl font-bold mb-8">
//         Shopping Cart
//       </h1>

//       {/* Empty Cart */}

//       {cartItems.length === 0 ? (
//         <div className="text-center py-20 text-gray-500">
//           Your cart is empty
//           <br />
//           <button
//             onClick={() => navigate("/shop")}
//             className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md"
//           >
//             Go Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-10">

//           {/* =========================
//               CART ITEMS
//           ========================= */}

//           <div className="md:col-span-2 space-y-4">

//             {cartItems.map((item) => (
//               <motion.div
//                 key={item._id}
//                 whileHover={{ scale: 1.01 }}
//                 className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg"
//               >

//                 <img
//                   src={item.product?.images[0]?.url}
//                   alt={item.product.name}
//                   className="w-24 h-24 object-cover rounded-md"
//                 />

//                 <div className="flex-1">

//                   <h2 className="font-semibold">
//                     {item.product.name.charAt(0).toUpperCase()+item.product.name.slice(1).toLowerCase()}
//                   </h2>

//                   <p className="text-blue-600 font-bold">
//                     ₹{item.price}
//                   </p>

//                   {/* Quantity Controls */}
//                   <div className="flex items-center gap-3 mt-2">

//                     <button
//                       onClick={() => decreaseQty(item._id)}
//                       className="px-2 py-1 border rounded"
//                     >
//                       -
//                     </button>

//                     <span>{item.quantity}</span>

//                     <button
//                       onClick={() => increaseQty(item._id)}
//                       className="px-2 py-1 border rounded"
//                     >
//                       +
//                     </button>

//                   </div>

//                 </div>

//                 {/* Remove */}
//                 <button
//                   onClick={() => removeItem(item._id)}
//                   className="text-red-500"
//                 >
//                   Remove
//                 </button>

//               </motion.div>
//             ))}

//           </div>

//           {/* =========================
//               SUMMARY BOX
//           ========================= */}

//           <div className="bg-white shadow-md p-6 rounded-lg h-fit">

//             <h2 className="text-xl font-bold mb-4">
//               Order Summary
//             </h2>

//             <div className="flex justify-between mb-2">
//               <span>Items</span>
//               <span>{cartItems.length}</span>
//             </div>

//             <div className="flex justify-between mb-4">
//               <span>Total</span>
//               <span className="font-bold text-blue-600">
//                 ₹{totalPrice}
//               </span>
//             </div>

//             <button
//               onClick={CheckoutHandler}
//               className="w-full bg-blue-600 text-white py-2 rounded-md"
//             >
//               Checkout
//             </button>

//            {/* <div className="w-full bg-blue-600 text-white py-2 rounded-md text-center">
//             <Link
//             to="/checkout"
//             className=" bg-blue-600 text-white py-2 rounded-md"
//           >
//           Checkout
//           </Link>
//           </div>
//            */}
//           </div>

//         </div>
//       )}

//     </div>
//   );
// };

// export default Cart;









import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { addToCart,getCart ,removeCartItem} from "../../api/api";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { cartStart , updateQuantitySuccess,addToCartSuccess ,setCartSuccess, removeFromCartSuccess} from "../../redux/slices/cartSlice";

const Cart = ()=> {


  const dispatch =  useDispatch();

  const { cartItems, itemsPrice, totalQuantity, loading, error } = useSelector((state) => state.cart);
  
  const navigate = useNavigate();


useEffect(()=>{
   const fetchCart =async ()=>{
    try{
      dispatch(cartStart());
        const res = await getCart();
        // console.log("cart = ",res.cart)
        dispatch(setCartSuccess(res.cart)); 
    }
    catch(err){
      console.log(err.message);
    }
    }
    fetchCart();
},[dispatch])

 
  const CheckoutHandler = (e)=>{
      e.preventDefault();
      navigate("/checkout");     
  }

  
  const increaseQty = (id) => {
    
     const item = cartItems.find((item)=> item._id===id)
     dispatch(updateQuantitySuccess({
      productId:id,
      quantity:item.quantity+1}
      ))
    
  };

  const decreaseQty = (id) => {
     const item = cartItems.find((item)=>item._id === id);
     dispatch(updateQuantitySuccess({
      productId:id,
      quantity:item.quantity-1
     }))
  };

 
  const removeItem = async (id) => {
      const res = removeCartItem(id);
      if(!res.cart){
           dispatch(removeFromCartSuccess(id));
      }
  };


  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-[var(--bg)] text-[var(--text)] ">

     <div className="flex flex-row justify-between items-center">
         <h1 className="text-3xl font-bold mb-8">
          Shopping Cart
      </h1>
       <button onClick={()=>navigate(-1)} className="bg-blue-200 hover:bg-gray-200 border rounded-md text-blue-700 text-xl py-1.5 px-4 mb-5">
        Back
      </button>
     </div>

     

     

      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-[var(--secondary)]">
          Your cart is empty
          <br />
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">

         
          <div className="md:col-span-2 space-y-4">

            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center gap-4 bg-[var(--card)] text-[var(--text)] shadow-md p-4 rounded-lg border border-[var(--border)] "
              >

                <img
                  src={item.product?.images[0]?.url}
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                <div className="flex-1">

                  <h2 className="font-semibold">
                    {item.product?.name.charAt(0).toUpperCase()+item.product?.name.slice(1).toLowerCase()}
                  </h2>

                  <p className="text-blue-600 font-bold">
                    ₹ {item.price}
                  </p>

                
                  <div className="flex items-center gap-3 mt-2">

                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>

                  </div>

                </div>

               
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500"
                >
                  Remove
                </button>

              </motion.div>
            ))}

          </div>

         
          <div className="bg-[var(--card)] text-[var(--text)] border border-[var(--border)] shadow-md p-6 rounded-lg h-fit">

            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="font-bold text-blue-600">
                ₹ {itemsPrice}
              </span>
            </div>

            <button
              onClick={CheckoutHandler}
              className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-md"
            >
              Checkout
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Cart;



















