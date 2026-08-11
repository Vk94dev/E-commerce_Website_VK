import { createSlice } from "@reduxjs/toolkit";

// const wishlistItems = localStorage.getItem("wishlistItems")
//     ? JSON.parse(localStorage.getItem("wishlistItems"))
//     : [];

const wishlistItems = [];

const initialState = {

    wishlistItems,

    loading: false,

    error: null

};

const wishlistSlice = createSlice({

    name: "wishlist",

    initialState,

    reducers: {

        wishlistStart: (state) => {

            state.loading = true;

            state.error = null;

        },
        setWishlist: (state, action) => {

            state.wishlistItems = action.payload;

            // const existProduct = state.wishlistItems.find(
            //     (item) => item._id === product._id
            // );

            // if (!existProduct) {

            //     state.wishlistItems.push(product);

            // }


        },

        addToWishlistSuccess: (state, action) => {

            state.loading = false;

            const product = action.payload;

            const existProduct = state.wishlistItems.find(
                (item) => item._id === product._id
            );

            if (!existProduct) {

                state.wishlistItems.push(product);

            }

            localStorage.setItem(
                "wishlistItems",
                JSON.stringify(state.wishlistItems)
            );

        },

        removeFromWishlistSuccess: (state, action) => {

            state.loading = false;

            state.wishlistItems =
                state.wishlistItems.filter(
                    (item) => item._id !== action.payload
                );

            // localStorage.setItem(
            //     "wishlistItems",
            //     JSON.stringify(state.wishlistItems)
            // );

        },

        clearWishlist: (state) => {

            state.wishlistItems = [];

            localStorage.removeItem(
                "wishlistItems"
            );

        },

        wishlistFailure: (state, action) => {

            state.loading = false;

            state.error = action.payload;

        },

        clearWishlistError: (state) => {

            state.error = null;

        }

    }

});

export const {

    wishlistStart,

    setWishlist,

    addToWishlistSuccess,

    removeFromWishlistSuccess,

    clearWishlist,

    wishlistFailure,

    clearWishlistError

} = wishlistSlice.actions;

export default wishlistSlice.reducer;

