import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    razorpayOrder: null,

    paymentResult: null,

    paymentHistory: [],

    loading: false,

    success: false,

    error: null

};

const paymentSlice = createSlice({

    name: "payment",

    initialState,

    reducers: {

        paymentStart: (state) => {

            state.loading = true;

            state.error = null;

            state.success = false;

        },

        createPaymentOrderSuccess: (state, action) => {

            state.loading = false;

            state.success = true;

            state.razorpayOrder = action.payload;

        },

        verifyPaymentSuccess: (state, action) => {

            state.loading = false;

            state.success = true;

            state.paymentResult = action.payload;

        },

        paymentHistorySuccess: (state, action) => {

            state.loading = false;

            state.paymentHistory = action.payload;

        },

        resetPayment: (state) => {

            state.razorpayOrder = null;

            state.paymentResult = null;

            state.success = false;

            state.error = null;

        },

        paymentFailure: (state, action) => {

            state.loading = false;

            state.error = action.payload;

        },

        clearPaymentError: (state) => {

            state.error = null;

        }

    }

});

export const {

    paymentStart,

    createPaymentOrderSuccess,

    verifyPaymentSuccess,

    paymentHistorySuccess,

    resetPayment,

    paymentFailure,

    clearPaymentError

} = paymentSlice.actions;

export default paymentSlice.reducer;

