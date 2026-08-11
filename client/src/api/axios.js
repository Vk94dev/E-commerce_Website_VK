import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials: true,
     headers: {
    "Content-Type": "application/json",
  },
});





// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
//     withCredentials: true,
//      headers: {
//     "Content-Type": "application/json",
//   },
// });





// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/* -----------------------------
   Request Interceptor
   → Attach token automatically
------------------------------ */

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

/* -----------------------------
   Response Interceptor
   → Global error handling
------------------------------ */

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       console.error("API Error:", error.response.data);
//     } else {
//       console.error("Network Error:", error.message);
//     }

//     return Promise.reject(error);
//   }
// );

export default api;

