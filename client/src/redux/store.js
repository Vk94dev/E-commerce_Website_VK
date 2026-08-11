import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import paymentReducer from "./slices/paymentSlice";
import wishlistReducer from "./slices/wishlistSlice";
import themeReducer from "./slices/themeSlice";


const store = configureStore({

    reducer: {

        auth: authReducer,

        product: productReducer,

        category: categoryReducer,

        cart: cartReducer,

        order: orderReducer,

        payment: paymentReducer,

        wishlist: wishlistReducer,

        theme: themeReducer

    },

    devTools: import.meta.env.DEV

});

export default store;
