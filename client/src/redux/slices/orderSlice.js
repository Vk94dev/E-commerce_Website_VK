import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    orders: [],

    order: null,

    loading: false,

    error: null,

    success: false

};

const orderSlice = createSlice({

    name: "order",

    initialState,

    reducers: {

        orderStart: (state) => {

            state.loading = true;

            state.error = null;

            state.success = false;

        },

        placeOrderSuccess: (state, action) => {

            state.loading = false;

            state.success = true;

            state.order = action.payload;

        },

        getOrdersSuccess: (state, action) => {

            state.loading = false;

            state.orders = action.payload;

        },

        getOrderDetailsSuccess: (state, action) => {

            state.loading = false;

            state.order = action.payload;

        },

        updateOrderSuccess: (state, action) => {

            state.loading = false;

            state.success = true;

            state.order = action.payload;

            state.orders = state.orders.map((order) =>
                order._id === action.payload._id
                    ? action.payload
                    : order
            );

        },

        cancelOrderSuccess: (state, action) => {

            state.loading = false;

            state.success = true;

            state.orders = state.orders.map((order) =>
                order._id === action.payload._id
                    ? action.payload
                    : order
            );

            if (
                state.order &&
                state.order._id === action.payload._id
            ) {
                state.order = action.payload;
            }

        },

        clearOrder: (state) => {

            state.order = null;

            state.success = false;

        },

        orderFailure: (state, action) => {

            state.loading = false;

            state.error = action.payload;

        },

        clearOrderError: (state) => {

            state.error = null;

        }

    }

});

export const {

    orderStart,

    placeOrderSuccess,

    getOrdersSuccess,

    getOrderDetailsSuccess,

    updateOrderSuccess,

    cancelOrderSuccess,

    clearOrder,

    orderFailure,

    clearOrderError

} = orderSlice.actions;

export default orderSlice.reducer;

