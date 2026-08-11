import { useEffect } from "react";
import { Suspense } from "react";           //Suspense displays a fallback UI (like Loading...) until the component is ready.
import { Toaster } from "react-hot-toast";

import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/common/Loader";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess,logout,setUser } from "./redux/slices/authSlice";
import { getCurrentUser,getWishlist ,getCart} from "./api/api";


import { setWishlist } from "./redux/slices/wishlistSlice";
import { setCartSuccess,cartStart } from "./redux/slices/cartSlice";


function App() {

   const dispatch = useDispatch();
   const user = useSelector((state) => state.auth.user);

   const theme = useSelector((state)=>state.theme.mode);

   useEffect(()=>{
    document.documentElement.className = theme;
   },[theme])


useEffect(() => {
    const checkLogin = async () => {
        try {
            const res = await getCurrentUser();
            // dispatch(loginSuccess(res.data.user));
            dispatch(setUser(res?.user));
        } 
        catch(err) {
            console.log(err.message);
            dispatch(logout());
        }
    };
    checkLogin();
}, []);


useEffect(() => {
    const fetchWishlist = async () => {
        try {
            const res = await getWishlist();

            dispatch(setWishlist(res.wishlist));
        } catch (err) {
            console.log(err);
        }
    };
    fetchWishlist();
}, []);

useEffect(()=>{
   const fetchCart =async ()=>{
    try{
      dispatch(cartStart());
        const res = await getCart();
        dispatch(setCartSuccess(res.cart));
      
    }
    catch(err){
      console.log(err.message);
    }
    }

    fetchCart();
},[dispatch])






    return (
        <>
            <Suspense fallback={<Loader />}>            
                <AppRoutes />
            </Suspense>

            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "12px",
                        background: "#1f2937",
                        color: "#fff"
                    }
                }}
            />
        </>
    );
}

export default App;