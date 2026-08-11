import { lazy } from "react";                        // lazy loads React components on demand (only when it is needed).
import { Routes,Route, Navigate} from "react-router-dom";

import UserLayout from "@/layouts/UserLayout";        //The @ symbol is a path alias .  It acts as a shortcut to represent a specific folder, usually the root source directory
import AdminLayout from "@/layouts/AdminLayout";


import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// import EditProduct from "../pages/Admin/EditProduct";

/* ========= Public Pages ========= */

const Home = lazy(() => import("@/pages/Front/Home"));
const Shop = lazy(() => import("@/pages/Front/Shop"));
const Categories = lazy(() => import("@/pages/Front/Categories"));
const ProductDetails = lazy(() =>
    import("@/pages/ProductDetails")
);

const Cart = lazy(() => import("@/pages/Cart/Cart"));

const Login = lazy(() => import("@/pages/Auth/Login"));

const Register = lazy(() =>
    import("@/pages/Auth/Register")
);

const Contact = lazy(()=> 
    import("@/pages/Front/Contact")
)

const Deals = lazy(()=>
     import("@/pages/Front/Deals")
)

const Wishlist = lazy(()=>
      import("@/pages/Wishlist/Wishlist")
)

const NotFound = lazy(() =>
    import("@/pages/NotFound")
);

/* ========= User Pages ========= */

const Checkout = lazy(() =>
    import("@/pages/Checkout/Checkout")
);

const Profile = lazy(() =>
    import("@/pages/Front/Profile")
);

const Orders = lazy(() =>
    import("@/pages/Order/Orders")
);

const OrderSuccess = lazy(()=>
    import("@/pages/Order/OrderSuccess")
)

const OrderDetails = lazy(()=>
       import("@/pages/Order/OrderDetails")
)

const TrackOrder  = lazy(()=>
    import("@/pages/Order/TrackOrder")
)




/* ========= Admin ========= */

const AdminDashboard = lazy(() =>
    import("@/pages/Admin/AdminDashboard")
);

const Products = lazy(() =>
    import("@/pages/Admin/Products")
);

const AddProduct = lazy(() =>
    import("@/pages/Admin/AddProduct")
);

const EditProduct = lazy((id)=>
     import(`@/pages/Admin/EditProduct`)
);

const Category = lazy(() =>
    import("@/pages/Admin/Categories")
);

const Users = lazy(() =>
    import("@/pages/Admin/Users")
);

const AdminOrders = lazy(() =>
    import("@/pages/Admin/Orders")
);

// const AdminProfile  = lazy(()=> 
// import("@/pages/Admin/AdminProfile"))

function AppRoutes() {

    return (

        <Routes>

            {/* ================= USER ================= */}

            <Route path="/" element={<UserLayout />}>

                <Route index element={<Home />} />

                <Route
                    path="shop"
                    element={<Shop />}
                />

                 <Route
                    path="categories"
                    element={<Categories />}
                />
                <Route 
                   path="contact"
                   element={<Contact />}
                />

                <Route
                     path="deals"
                     element={<Deals />}
                 />  

                  <Route
                     path="wishlist"
                     element={<Wishlist />}
                 />      

                <Route
                    path="product/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="cart"
                    element={<Cart />}
                />

                <Route
                    path="login"
                    element={<Login />}
                />

                <Route
                    path="register"
                    element={<Register />}
                />

                {/* Protected */}

                <Route
                    element={<ProtectedRoute />}
                >

                    <Route
                        path="checkout"
                        element={<Checkout />}
                    />

                    <Route
                        path="profile"
                        element={
                        // <ProtectedRoute>
                            <Profile />
                    //    </ProtectedRoute>
                        }
                    />

                    <Route
                        path="orders"
                        element={<Orders />}
                    />

                    <Route
                      path="order-success"
                      element={<OrderSuccess />}
                    />

                    <Route 
                    path="orders/:id"
                    element={<OrderDetails />}
                    />
                    <Route 
                     path="orders/:id/track-order"
                     element={<TrackOrder />}
                    />

                    

                </Route>

            </Route>

            {/* <Route
                path="/admin"
                element={<AdminRoute />}
            >

                <Route
                    element={<AdminLayout />}
                >

                    <Route
                        index
                        element={<Dashboard />}
                    />

                    <Route
                        path="products"
                        element={<Products />}
                    />

                    <Route
                        path="categories"
                        element={<Categories />}
                    />

                    <Route
                        path="users"
                        element={<Users />}
                    />

                    <Route
                        path="orders"
                        element={<AdminOrders />}
                    />

                </Route>

            </Route> */}

       <Route element={<AdminRoute/>}>

         <Route element={<AdminLayout/>}>

       <Route path="/admin/dashboard"
            element={<AdminDashboard/>}
        />


<Route
path="/admin/products"
element={<Products/>}
/>

<Route 
path="/admin/categories"
element={<Category />}
/>


<Route
path="/admin/add-product"
element={<AddProduct/>}
/>

<Route 
path="/admin/edit-product/:id"
element={<EditProduct />}
/>

<Route
path="/admin/orders"
element={<AdminOrders/>}
/>


<Route
path="/admin/users"
element={<Users/>}
/>

{/* <Route path="/admin/profile" element={<AdminProfile />}/> */}

</Route>


</Route>

            {/* Redirect */}

            <Route
                path="/home"
                element={<Navigate to="/" replace />}
            />

            {/* 404 */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}

export default AppRoutes;

