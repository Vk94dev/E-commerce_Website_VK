import { createSlice } from "@reduxjs/toolkit";

// const userInfo = localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null;

// const token = localStorage.getItem("token") || null;

// const initialState = {
//     userInfo,
//     isAuthenticated: !!token,
//     loading: false,
//     error: null
// };

const initialState = {
    user: null,
    isLoggedIn: false,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",

    initialState,
    reducers: {
        authStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },

        // loginSuccess: (state, action) => {

        //     state.loading = false;

        //     state.userInfo = action.payload.user;

        //     // state.token = action.payload.token;

        //     state.isAuthenticated = true;

        //     localStorage.setItem(
        //         "userInfo",
        //         JSON.stringify(action.payload.user)
        //     );

        //     // localStorage.setItem(
        //     //     "token",
        //     //     action.payload.token
        //     // );
        // },

        registerSuccess: (state, action) => {
            state.loading = false;

            state.user = action.payload;
            state.isLoggedIn = true;

            // state.userInfo = action.payload.user;

            // state.token = action.payload.token;

            // state.isAuthenticated = true;

            // localStorage.setItem(
            //     "userInfo",
            //     JSON.stringify(action.payload.user)
            // );

            // localStorage.setItem(
            //     "token",
            //     action.payload.token
            // );
        },

        loadUserSuccess: (state, action) => {
            // state.loading = false;

            state.user = action.payload;
            state.isLoggedIn = true;
            // state.isAuthenticated = true;
        },

        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.loading = false;
        },

        // updateProfileSuccess: (state, action) => {

        //     state.userInfo = action.payload;

        //     localStorage.setItem(
        //         "userInfo",
        //         JSON.stringify(action.payload)
        //     );

        // },
        updateUser(state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
        },

        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
        },

        authFailure: (state, action) => {
            state.loading = false;

            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },

        // logout: (state) => {

        //     state.userInfo = null;

        //     state.token = null;

        //     state.isAuthenticated = false;

        //     state.loading = false;

        //     state.error = null;

        //     localStorage.removeItem("token");

        //     localStorage.removeItem("userInfo");

        // }
    },
});

export const {
    authStart,

    loginSuccess,

    registerSuccess,

    loadUserSuccess,
    setUser,

    // updateProfileSuccess,
    updateUser,

    authFailure,

    clearError,

    logout,
} = authSlice.actions;

export default authSlice.reducer;
