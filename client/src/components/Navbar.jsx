// import { useState, useEffect, useRef } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { logout } from "../redux/slices/authSlice";
// import { logoutUser } from "../api/api";
// import {addToWishlistSuccess ,setWishlist} from "../redux/slices/wishlistSlice"
// import { clearCarts } from "../redux/slices/cartSlice";
// import { clearWishlist } from "../redux/slices/wishlistSlice";


// import {FaShoppingCart,FaHeart,FaUserCircle,FaSearch, FaBars,FaTimes,FaMoon,FaSun,FaChevronDown} from "react-icons/fa";



// const Navbar = () => {
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const {totalQuantity} = useSelector((state)=>state.cart)

//   const wishlistItems = useSelector(state=>state.wishlist.wishlistItems);

//   // console.log(wishlistItems)
//   // console.log("cart no. = ",totalQuantity);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [userDropdown, setUserDropdown] = useState(false);
//   const [search, setSearch] = useState("");
//   const [darkMode, setDarkMode] = useState(false);

  
//   // const [wishlistCount] = useState(null);
 
//   // const wishlistCount = wishlistItems.length;

//   const dropdownRef = useRef(null);

//   const navLinks = [
//     {
//       name: "Home",
//       path: "/",
//     },
//     {
//       name: "Shop",
//       path: "/shop",
//     },
//     {
//       name: "Categories",
//       path: "/categories",
//     },
//     {
//       name: "Deals",
//       path: "/deals",
//     },
//     {
//       name: "Contact",
//       path: "/contact",
//     },
//   ];

//   const handleSearch = (e) => {
//   e.preventDefault();

//   if (!search.trim()) return;

//   navigate(`/shop?search=${encodeURIComponent(search)}`);
//   setSearch(""); // clear after search
// };


//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target)
//       ) {
//         setUserDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);



// const isLoggedIn = useSelector(
//     state => state.auth.isLoggedIn
// );

// const user = useSelector((state) => state.auth.user);

//   const handleLogout =async () => {
//     await logoutUser();
//     dispatch(logout(false));
//     dispatch(clearCarts());
//     dispatch(clearWishlist())
//     localStorage.setItem("user-role","");
//     setUserDropdown(false);
//     navigate("/");
//   };





//   /* -----------------------------
//       Mobile Navigation Links
//   ------------------------------ */

//   const mobileLinks = [
//     { name: "Home", path: "/" },
//     { name: "Shop", path: "/shop" },
//     { name: "Categories", path: "/categories" },
//     { name: "Deals", path: "/deals" },
//     { name: "Contact", path: "/contact" },
//   ];



//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);




//   return (
//     <>
//    <header
//   className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${
//     darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
//   }`}
// >

//       {/* Main Navbar */}

//       <div className="max-w-7xl mx-auto px-4">

//         <div className="flex items-center justify-between h-16">

//           {/* Logo */}

//           <Link
//             to="/"
//             className="text-2xl font-bold text-blue-600 pr-4"
//           >
//             {import.meta.env.VITE_APP_NAME}
//           </Link>

//           {/* Desktop Navigation */}

//           <nav className="hidden lg:flex items-center gap-4">

//             {navLinks.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                className={({ isActive }) =>
//   `relative font-medium transition duration-200 ${
//     isActive
//       ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600"
//       : "text-gray-700 hover:text-blue-600"
//   }`
// }
//               >
//                 {item.name}
//               </NavLink>
//             ))}

//           </nav>

//           {/* Search */}

//           <form
//             onSubmit={handleSearch}
//             className="hidden md:flex flex-1 max-w-xl mx-8"
//           >

//             <div className="relative w-full">

//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full border rounded-full py-2 pl-11 pr-4
//                            focus:outline-none focus:ring-2
//                            focus:ring-blue-500"
//               />

//               <FaSearch
//                 className="absolute left-4 top-1/2
//                            -translate-y-1/2 text-gray-500"
//               />

//             </div>

//           </form>

//           {/* Right Icons */}

//           <div className="flex items-center gap-5">
             
//             {/* Wishlist */}

//             <Link
//               to="/wishlist"
//               className="relative"
//             >
//               <FaHeart size={22} />

//               {wishlistItems?.length > 0 && (
//                 <span
//                   className="absolute
//                              -top-2
//                              -right-2
//                              bg-red-500
//                              text-white
//                              text-xs
//                              rounded-full
//                              w-5
//                              h-5
//                              flex
//                              items-center
//                              justify-center"
//                 >
//                   {wishlistItems.length || 0 }
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}

//             <Link
//               to="/cart"
//               className="relative"
//             >
//               <FaShoppingCart size={22} />

//               {totalQuantity > 0 && (
//                 <span
//                   className="absolute
//                              -top-2
//                              -right-2
//                              bg-blue-600
//                              text-white
//                              text-xs
//                              rounded-full
//                              w-5
//                              h-5
//                              flex
//                              items-center
//                              justify-center"
//                 >
//                   {totalQuantity}
//                 </span>
//               )}
//             </Link>

//             {/* User Dropdown Button */}

//             <button
//               ref={dropdownRef}
//               onClick={() =>
//                 setUserDropdown(!userDropdown)
//               }
//               className="hidden lg:flex items-center gap-2"
//             >
//              {isLoggedIn ?(<div className="font-bold h-7 w-7 text-xl bg-zinc-800 rounded-[50%] text-white">{user?.name[0].toUpperCase()}</div>):(<FaUserCircle size={26} />)} 
//               <FaChevronDown size={12} />
//             </button>

//             {/* Mobile Menu Button */}

//             <button
//               onClick={() =>
//                 setMobileOpen(!mobileOpen)
//               }
//               className="lg:hidden"
//             >
//               {mobileOpen ? (
//                 <FaTimes size={24} />
//               ) : (
//                 <FaBars size={24} />
//               )}
//             </button>

//             <button
//                onClick={() => setDarkMode(!darkMode)}
//                 className="hidden lg:flex items-center justify-center"
//             >
//              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
//             </button>

//           </div>

//         </div>

//       </div>







//     <>

//       {/* =========================
//           USER DROPDOWN (DESKTOP)
//       ========================= */}

//      {userDropdown && (
//   <motion.div
//     initial={{ opacity: 0, y: -10 }}
//     animate={{ opacity: 1, y: 0 }}
//     exit={{ opacity: 0, y: -10 }}
//     transition={{ duration: 0.2 }}
//     ref={dropdownRef}
//     className="absolute right-6 top-16 w-52 bg-white shadow-lg rounded-lg z-50 border"
//   >
//           <ul className="py-2">

//             {isLoggedIn ? (
//               <>
//                 <li>
//                   <button
//                     onClick={() => navigate("/profile")}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     My Profile
//                   </button>
//                 </li>

//                 <li>
//                   <button
//                     onClick={() => navigate("/orders")}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     My Orders
//                   </button>
//                 </li>

//                 <li>
//                   <button
//                     onClick={() => navigate("/wishlist")}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Wishlist
//                   </button>
//                 </li>

//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Login
//                   </button>
//                 </li>

//                 <li>
//                   <button
//                     onClick={() => navigate("/register")}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Register
//                   </button>
//                 </li>
//               </>
//             )}

//           </ul>
//         </motion.div>
//       )}

//       {/* =========================
//           WRAP MAIN NAVBAR CONTINUATION
//       ========================= 
      
//       <div className="hidden lg:flex items-center gap-3 relative">

//         <button
//           onClick={() => setUserDropdown(!userDropdown)}
//           className="flex items-center gap-2"
//         >
//           <FaUserCircle size={26} />
//           <span className="text-sm">
//             {isLoggedIn ? "Account" : "Guest"}
//           </span>
//           <FaChevronDown size={12} />
//         </button>

//       </div>   */}

//     </>
 






//     <>

//       {/* =========================
//           MOBILE OVERLAY
//       ========================= */}

//       {mobileOpen && (
//         <div
//           onClick={() => setMobileOpen(false)}
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//         />
//       )}

//       {/* =========================
//           MOBILE SIDEBAR DRAWER
//       ========================= */}

//      <motion.div
//   initial={{ x: "-100%" }}
//   animate={{ x: mobileOpen ? 0 : "-100%" }}
//   transition={{ type: "tween", duration: 0.3 }}
//   className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg lg:hidden"
// >

//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl font-bold text-blue-600">
//             Menu
//           </h2>

//           <button onClick={() => setMobileOpen(false)}>
//             <FaTimes size={22} />
//           </button>
//         </div>

//         {/* Links */}
//         <nav className="flex flex-col p-4 gap-2">

//           {mobileLinks.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               onClick={() => setMobileOpen(false)}
//              className={({ isActive }) =>
//   `relative font-medium transition duration-200 ${
//     isActive
//       ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600"
//       : "text-gray-700 hover:text-blue-600"
//   }`
// }
//             >
//               {item.name}
//             </NavLink>
//           ))}

//         </nav>

//         {/* Divider */}
//         <hr className="my-2" />

//         {/* Quick Actions */}
//         <div className="p-4 flex flex-col gap-3">

//           <Link
//             to="/cart"
//             onClick={() => setMobileOpen(false)}
//             className="flex items-center justify-between"
//           >
//             <span>Cart</span>
//             <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
//               {totalQuantity || 1}
//             </span>
//           </Link>

//           <Link
//             to="/wishlist"
//             onClick={() => setMobileOpen(false)}
//             className="flex items-center justify-between"
//           >
//             <span>Wishlist</span>
//             <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//               {/* {wishlistCount} */}
//               {wishlistItems?.length}
//             </span>
//           </Link>

//         </div>

//         {/* Auth Section */}
//         <div className="absolute bottom-0 w-full p-4 border-t">

//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="w-full bg-red-500 text-white py-2 rounded-md"
//             >
//               Logout
//             </button>
//           ) : (
//             <div className="flex flex-col gap-2">
//               <button
//                 onClick={() => {
//                   navigate("/login");
//                   setMobileOpen(false);
//                 }}
//                 className="w-full bg-blue-600 text-white py-2 rounded-md"
//               >
//                 Login
//               </button>

//               <button
//                 onClick={() => {
//                   navigate("/register");
//                   setMobileOpen(false);
//                 }}
//                 className="w-full border py-2 rounded-md"
//               >
//                 Register
//               </button>
//             </div>
//           )}

//         </div>

//       </motion.div>
//     </>
 
//  </header>


//  </>
// )
// }


// export default Navbar











import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { logoutUser } from "../api/api";
import {addToWishlistSuccess ,setWishlist} from "../redux/slices/wishlistSlice"
import { clearCarts } from "../redux/slices/cartSlice";
import { clearWishlist } from "../redux/slices/wishlistSlice";


import {FaShoppingCart,FaHeart,FaUserCircle,FaSearch, FaBars,FaTimes,FaMoon,FaSun,FaChevronDown} from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";


const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const mode = useSelector((state)=>state.theme.mode);

  const {totalQuantity} = useSelector((state)=>state.cart)

  const wishlistItems = useSelector(state=>state.wishlist.wishlistItems);

  // console.log(wishlistItems)
  // console.log("cart no. = ",totalQuantity);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [search, setSearch] = useState("");
  

  
  // const [wishlistCount] = useState(null);
 
  // const wishlistCount = wishlistItems.length;

  const dropdownRef = useRef(null);

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "/shop",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "Deals",
      path: "/deals",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const handleSearch = (e) => {
  e.preventDefault();

  if (!search.trim()) return;

  navigate(`/shop?search=${encodeURIComponent(search)}`);
  setSearch(""); // clear after search
};


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



const isLoggedIn = useSelector(
    state => state.auth.isLoggedIn
);

const user = useSelector((state) => state.auth.user);

  const handleLogout =async () => {
    await logoutUser();
    dispatch(logout(false));
    dispatch(clearCarts());
    dispatch(clearWishlist())
    localStorage.setItem("user-role","");
    setUserDropdown(false);
    navigate("/");
  };





  /* -----------------------------
      Mobile Navigation Links
  ------------------------------ */

  const mobileLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Deals", path: "/deals" },
    { name: "Contact", path: "/contact" },
  ];





  return (
    <>
  <header
className="sticky top-0 z-50 shadow-md transition-colors duration-300
bg-[var(--card)]
text-[var(--text)] border border-[var(--border)] "
>
      {/* Main Navbar */}

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 pr-4"
          >
            {import.meta.env.VITE_APP_NAME}
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-4">

            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
               className={({ isActive }) =>
  `relative font-medium transition duration-200 ${
    isActive
      ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600"
      : "text-[var(--text)] hover:text-blue-600"
  }`
}
              >
                {item.name}
              </NavLink>
            ))}

          </nav>

          {/* Search */}

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-8"
          >

            <div className="relative w-full">

             <input
className="
w-full
border
border-[var(--border)]
bg-[var(--bg)]
text-[var(--text)]
placeholder:text-[var(--secondary)]
rounded-full
py-2
pl-11
pr-4
focus:outline-none
focus:ring-2
focus:ring-[var(--primary)]
"
/>
              <FaSearch
                className="absolute left-4 top-1/2
                           -translate-y-1/2 text-[var(--secondary)]"
              />

            </div>

          </form>

          {/* Right Icons */}

          <div className="flex items-center gap-5">
             
            {/* Wishlist */}

            <Link
              to="/wishlist"
              className="relative border-[var(--border)]"
            >
              <FaHeart size={22} className=" bg-[var(--bg)]
  text-[var(--text)]
  border
  border-[var(--border)] rounded-[50%] h-10 w-10 p-1.5" />

              {wishlistItems?.length > 0 && (
                <span
                  className="absolute
                             -top-2
                             -right-2
                             bg-red-600
                             text-[var(--cart)]
                             text-xs
                             rounded-full
                             w-5
                             h-5
                             flex
                             items-center
                             justify-center"
                >
                  {wishlistItems.length || 0 }
                </span>
              )}
            </Link>

            {/* Cart */}

            <Link
              to="/cart"
              className="relative border-[var(--border)]"
            >
              <FaShoppingCart size={22} className=" bg-[var(--bg)]
  text-[var(--text)]
  border
  border-[var(--border)] rounded-[50%] h-10 w-10 p-1" />

              {totalQuantity > 0 && (
                <span
                  className="absolute
                             -top-2
                             -right-2
                             bg-blue-600
                             text-[var(--card)]
                             text-xs
                             rounded-full
                             w-5
                             h-5
                             flex
                             items-center
                             justify-center"
                >
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* User Dropdown Button */}

            <button
              ref={dropdownRef}
              onClick={() =>
                setUserDropdown(!userDropdown)
              }
              className="hidden lg:flex items-center gap-2 "
            >
             {isLoggedIn ?(<div className="font-bold h-10 w-10 p-1 text-2xl bg-[var(--bg)] rounded-[50%] border border-[var(--border)] ">{user?.name[0].toUpperCase()}</div>):(<FaUserCircle size={26}  />)} 
              <FaChevronDown size={12} />
            </button>

            {/* Mobile Menu Button */}

            <button
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="lg:hidden"
            >
              {mobileOpen ? (
                <FaTimes size={24} />
              ) : (
                <FaBars size={24} />
              )}
            </button>

           <ThemeToggle />

          </div>

        </div>

      </div>







    <>

      {/* =========================
          USER DROPDOWN (DESKTOP)
      ========================= */}

     {userDropdown && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    ref={dropdownRef}
    className="absolute right-6 top-16 w-52 bg-[var(--bg)] shadow-lg rounded-lg z-50 border"
  >
          <ul className="py-2">

            {isLoggedIn ? (
              <>
                <li>
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 hover:bg-[var(--card)]"
                  >
                    My Profile
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full text-left px-4 py-2 hover:bg-[var(--card)] "
                  >
                    My Orders
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/wishlist")}
                    className="w-full text-left px-4 py-2 hover:bg-[var(--card)] "
                  >
                    Wishlist
                  </button>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-[var(--card)] "
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full text-left px-4 py-2 hover:bg-[var(--secondary)] "
                  >
                    Login
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => navigate("/register")}
                    className="w-full text-left px-4 py-2 hover:bg-[var(--secondary)]"
                  >
                    Register
                  </button>
                </li>
              </>
            )}

          </ul>
        </motion.div>
      )}

      {/* =========================
          WRAP MAIN NAVBAR CONTINUATION
      ========================= 
      
      <div className="hidden lg:flex items-center gap-3 relative">

        <button
          onClick={() => setUserDropdown(!userDropdown)}
          className="flex items-center gap-2"
        >
          <FaUserCircle size={26} />
          <span className="text-sm">
            {isLoggedIn ? "Account" : "Guest"}
          </span>
          <FaChevronDown size={12} />
        </button>

      </div>   */}

    </>
 






    <>

      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* =========================
          MOBILE SIDEBAR DRAWER
      ========================= */}

     <motion.div
  initial={{ x: "-100%" }}
  animate={{ x: mobileOpen ? 0 : "-100%" }}
  transition={{ type: "tween", duration: 0.3 }}
  className="fixed top-0 left-0 h-full w-72 bg-[var(--card)] z-50 shadow-lg lg:hidden"
>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">
            Menu
          </h2>

          <button onClick={() => setMobileOpen(false)}>
            <FaTimes size={22} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col p-4 gap-2">

          {mobileLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
             className={({ isActive }) =>
  `relative font-medium transition duration-200 ${
    isActive
      ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-blue-600"
      : "text-[var(--text)] hover:text-blue-600"
  }`
}
            >
              {item.name}
            </NavLink>
          ))}

        </nav>

        {/* Divider */}
        <hr className="my-2" />

        {/* Quick Actions */}
        <div className="p-4 flex flex-col gap-3">

          <Link
            to="/cart"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between"
          >
            <span>Cart</span>
            <span className="bg-blue-600 text-[var(--card)] text-xs px-2 py-1 rounded-full">
              {totalQuantity || 1}
            </span>
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between"
          >
            <span>Wishlist</span>
            <span className="bg-red-500 text-[var(--card)] text-xs px-2 py-1 rounded-full">
              {/* {wishlistCount} */}
              {wishlistItems?.length}
            </span>
          </Link>

        </div>

        {/* Auth Section */}
        <div className="absolute bottom-0 w-full p-4 border-t">

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-[var(--card)] py-2 rounded-md"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
                className="w-full bg-blue-600 text-[var(--card)] py-2 rounded-md"
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate("/register");
                  setMobileOpen(false);
                }}
                className="w-full border py-2 rounded-md"
              >
                Register
              </button>
            </div>
          )}

        </div>

      </motion.div>
    </>
 
 </header>


 </>
)
}


export default Navbar














