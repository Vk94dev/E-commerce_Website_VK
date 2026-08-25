import axios from "axios";
import toast from "react-hot-toast";


const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
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

let is401Status = false;

api.interceptors.response.use(
   (response) => response,
   // (error) => {
   //    if (error.response) {
   //       console.error("API Error:", error.response.data);
   //    } else {
   //       console.error("Network Error:", error.message);
   //    }

   (error) => {
      if (error.response?.status === 401 && !is401Status) {
         is401Status = true;
         toast.error(error.response.data.message || "Unauthorized");
         setTimeout(() => {
            is401Status = false;
         }, 3000)
      }

      return Promise.reject(error);
   }
);


export default api;

