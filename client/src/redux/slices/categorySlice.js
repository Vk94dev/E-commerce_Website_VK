import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    category: null,
    loading: false,
    error: null
};

const categorySlice = createSlice({

    name: "category",

    initialState,

    reducers: {

        categoryStart: (state) => {

            state.loading = true;

            state.error = null;

        },

        getCategoriesSuccess: (state, action) => {

            state.loading = false;

            state.categories = action.payload;

        },

        getCategorySuccess: (state, action) => {

            state.loading = false;

            state.category = action.payload;

        },

        createCategorySuccess: (state, action) => {

            state.loading = false;

            state.categories.unshift(action.payload);

        },

        updateCategorySuccess: (state, action) => {

            state.loading = false;

            state.categories = state.categories.map((category) =>
                category._id === action.payload._id
                    ? action.payload
                    : category
            );

            if (
                state.category &&
                state.category._id === action.payload._id
            ) {
                state.category = action.payload;
            }

        },

        deleteCategorySuccess: (state, action) => {

            state.loading = false;

            state.categories = state.categories.filter(
                (category) => category._id !== action.payload
            );

            if (
                state.category &&
                state.category._id === action.payload
            ) {
                state.category = null;
            }

        },

        clearSelectedCategory: (state) => {

            state.category = null;

        },

        categoryFailure: (state, action) => {

            state.loading = false;

            state.error = action.payload;

        },

        clearCategoryError: (state) => {

            state.error = null;

        }

    }

});

export const {

    categoryStart,

    getCategoriesSuccess,

    getCategorySuccess,

    createCategorySuccess,

    updateCategorySuccess,

    deleteCategorySuccess,

    clearSelectedCategory,

    categoryFailure,

    clearCategoryError

} = categorySlice.actions;

export default categorySlice.reducer;

