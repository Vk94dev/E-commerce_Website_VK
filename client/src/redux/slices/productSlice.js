import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    products: [],

    featuredProducts: [],

    bestSellerProducts: [],

    product: null,

    loading: false,

    error: null,

    page: 1,

    pages: 1,

    totalProducts: 0,

    filters: {

        keyword: "",

        category: "",

        minPrice: 0,

        maxPrice: 100000,

        rating: 0,

        sort: ""

    }

};

const productSlice = createSlice({

    name: "product",

    initialState,

    reducers: {

        productStart: (state) => {

            state.loading = true;

            state.error = null;

        },

        getProductsSuccess: (state, action) => {

            state.loading = false;

            state.products = action.payload.products;

            state.page = action.payload.page;

            state.pages = action.payload.pages;

            state.totalProducts = action.payload.totalProducts;

        },

        getProductSuccess: (state, action) => {

            state.loading = false;

            state.product = action.payload;

        },

        featuredProductsSuccess: (state, action) => {

            state.loading = false;

            state.featuredProducts = action.payload;

        },

        bestSellerProductsSuccess: (state, action) => {

            state.loading = false;

            state.bestSellerProducts = action.payload;

        },

        setFilters: (state, action) => {

            state.filters = {

                ...state.filters,

                ...action.payload

            };

        },

        clearFilters: (state) => {

            state.filters = initialState.filters;

        },

        clearSelectedProduct: (state) => {

            state.product = null;

        },

        productFailure: (state, action) => {

            state.loading = false;

            state.error = action.payload;

        },

        clearProductError: (state) => {

            state.error = null;

        }

    }

});

export const {

    productStart,

    getProductsSuccess,

    getProductSuccess,

    featuredProductsSuccess,

    bestSellerProductsSuccess,

    setFilters,

    clearFilters,

    clearSelectedProduct,

    productFailure,

    clearProductError

} = productSlice.actions;

export default productSlice.reducer;


