import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const shippingAddress = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const calculateTotals = (cartItems) => {

    const itemsPrice = cartItems.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
    );

    const totalQuantity = cartItems.reduce(
        (acc, item) => acc + Number(item.quantity),
        0
    );
    return {
        itemsPrice , totalQuantity
    };
};

const initialTotals = calculateTotals(cartItems);

const initialState = {
    cartItems:[],
    shippingAddress,
    itemsPrice: initialTotals.itemsPrice,
    totalQuantity: initialTotals.totalQuantity,
    loading: false,
    error: null
};

const cartSlice = createSlice({

    name: "cart",

    initialState,

    reducers: {

        cartStart: (state) => {

            state.loading = true;

            state.error = null;

        },

        addToCartSuccess: (state, action) => {

            state.loading = false;

            const item = action.payload;

            const existItem = state.cartItems.find(
                (x) => x._id === item._id
            );

            if (existItem) {

                state.cartItems = state.cartItems.map((x) =>
                    x._id === item._id ? item : x
                );

            } else {

                state.cartItems.push(item);

            }

            const totals = calculateTotals(state.cartItems);

            state.itemsPrice = totals.itemsPrice;

            state.totalQuantity = totals.totalQuantity;

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );

        },

        setCartSuccess: (state, action) => {

    state.loading = false;

    state.cartItems = action.payload;

    const totals = calculateTotals(state.cartItems);

    state.itemsPrice = totals.itemsPrice;

    state.totalQuantity = totals.totalQuantity;
},

        removeFromCartSuccess: (state, action) => {

            state.loading = false;

            state.cartItems = state.cartItems.filter(
                (item) => item._id !== action.payload
            );

            const totals = calculateTotals(state.cartItems);

            state.itemsPrice = totals.itemsPrice;

            state.totalQuantity = totals.totalQuantity;

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );

        },

        updateQuantitySuccess: (state, action) => {

            state.loading = false;

            const { productId, quantity } = action.payload;

            state.cartItems = state.cartItems.map((item) =>
                item._id === productId
                    ? { ...item, quantity }
                    : item
            );

            const totals = calculateTotals(state.cartItems);

            state.itemsPrice = totals.itemsPrice;

            state.totalQuantity = totals.totalQuantity;

            localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
            );

        },

        saveShippingAddress: (state, action) => {

            state.shippingAddress = action.payload;

            localStorage.setItem(
                "shippingAddress",
                JSON.stringify(action.payload)
            );

        },

        clearCarts: (state) => {

            state.cartItems = [];

            state.itemsPrice = 0;

            state.totalQuantity = 0;

            localStorage.removeItem("cartItems");

        },

        cartFailure: (state, action) => {

            state.loading = false;

            state.error = action.payload;

        },

        clearCartError: (state) => {

            state.error = null;

        }

    }

});

export const {

    cartStart,

    addToCartSuccess,

     setCartSuccess,

    removeFromCartSuccess,

    updateQuantitySuccess,

    saveShippingAddress,

    clearCarts,

    cartFailure,

    clearCartError

} = cartSlice.actions;

export default cartSlice.reducer;

