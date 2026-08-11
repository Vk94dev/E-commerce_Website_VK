import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, createOrder } from "../../api/api";
import { clearCarts } from "../../redux/slices/cartSlice";

const Checkout = () => {

  const navigate = useNavigate();

   const dispatch = useDispatch();

   const {itemsPrice,totalQuantity} = useSelector((state)=>state.cart);

  
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [error, setError] = useState("");

  /* -----------------------------
     Place Order Handler
  ------------------------------ */

  const handleOrder = async (e) => {
   try{
    e.preventDefault();

    if (!address || !city || !pincode) {
      setError("Please fill all address fields");
      return;
    }

    if (pincode.length !== 6) {
      setError("Invalid pincode");
      return;
    }

    // alert("Order placed successfully 🎉");

    const res = await createOrder({address,city,pincode,paymentMethod});
      console.log(res);
      dispatch(clearCarts());
     await clearCart();

    navigate("/order-success");
  }
  catch(err){
    setError(err.response?.data?.message || "Failed to place order");
  }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 ">


     <div className="flex flex-row justify-between items-center ">
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <button onClick={()=>navigate(-1)} className="bg-blue-200 hover:bg-gray-200 border rounded-md text-blue-700 text-xl py-1.5 px-4 mb-5">
        Back
      </button>
      </div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* =========================
            ADDRESS FORM
        ========================= */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[var(--card)] border border-[var(--border)] shadow-md p-6 rounded-lg"
        >

          <h2 className="text-xl font-semibold mb-4">
            Shipping Address
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-3">
              {error}
            </p>
          )}

          <form onSubmit={handleOrder} className="space-y-4">

            <textarea
              placeholder="Full Address"
              className="w-full outline-none p-2 rounded bg-[var(--bg)]  border border-[var(--border)] "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              placeholder="City"
              className="w-full outline-none bg-[var(--bg)]  border border-[var(--border)] p-2 rounded"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              type="number"
              placeholder="Pincode"
              className="w-full outline-none bg-[var(--bg)]  border border-[var(--border)] p-2 rounded"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            {/* Payment Methods */}
            <div className="mt-4">

              <h3 className="font-semibold mb-2">
                Payment Method
              </h3>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2 mt-2">
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                Online Payment
              </label>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-800"
            >
              Place Order
            </button>

          </form>

        </motion.div>

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[var(--card)]  border border-[var(--border)]  shadow-md p-6 rounded-lg h-fit"
        >

          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

           <div className="flex justify-between mb-2">
            <span>Total Quantity</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Total Price</span>
            <span className="text-blue-700 font-semibold">₹ {itemsPrice}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹ {itemsPrice}</span>
          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Checkout;

