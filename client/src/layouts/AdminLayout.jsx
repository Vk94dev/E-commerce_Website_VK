import { Outlet, NavLink, resolvePath } from "react-router-dom";
import {
    FaBoxOpen,
    FaShoppingCart,
    FaUsers,
    FaUser,
    FaTags,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";

import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api";
import ThemeToggle from "../components/ThemeToggle";


const AdminLayout = () => {

    const dispatch = useDispatch();
   const Navigate = useNavigate();

    const logoutHandler = async () => {
        await logoutUser();
        dispatch(logout());
        localStorage.setItem("user-role","");
        Navigate("/");

    };

    const menuItems = [
        {
            title: "Dashboard",
            icon: <FaChartBar />,
            path: "/admin/dashboard"
        },
        {
            title: "Products",
            icon: <FaBoxOpen />,
            path: "/admin/products"
        },
        {
            title: "Categories",
            icon: <FaTags />,
            path: "/admin/categories"
        },
        {
            title: "Orders",
            icon: <FaShoppingCart />,
            path: "/admin/orders"
        },
        {
            title: "Users",
            icon: <FaUsers />,
            path: "/admin/users"
        }
        // {
        //    title:"Profile",
        //    icon:<FaUser />,
        //    path:"/admin/profile"
        // }
    ];

    return (

        <div className="h-screen flex bg-[var(--bg)]">

            {/* Sidebar */}

            <aside className="w-72 bg-gray-900 text-white flex flex-col border-r border-[var(--border)]">

                <div className="text-3xl font-bold text-center py-8 border-b border-gray-700">

                    Admin Panel

                </div>

                <nav className="flex-1 px-4 py-2">

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/admin"}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition-all duration-300 ${
                                    isActive
                                        ? "bg-blue-600"
                                        : "hover:bg-gray-800"
                                }`
                            }
                        >

                            <span className="text-xl">

                                {item.icon}

                            </span>

                            <span>

                                {item.title}

                            </span>

                        </NavLink>

                    ))}

                </nav>

                <div className="p-2 border-t border-gray-700">

                    <button
                        onClick={logoutHandler}
                        className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition-all"
                    >

                        <FaSignOutAlt />

                        Logout

                    </button>

                </div>

            </aside>

            {/* Main Content */}

            <div className="flex-1">

                {/* Header */}

                <header className="bg-[var(--card)] border-b border-[var(--border)] shadow px-8 py-3 flex justify-between items-center">

                    <h1 className="text-2xl font-bold">

                        Admin Dashboard

                    </h1>

                    <ThemeToggle />

                </header>

                {/* Page Content */}

                <main className="p-4">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default AdminLayout;






