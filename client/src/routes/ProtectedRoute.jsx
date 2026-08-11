import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/* -----------------------------
   Protected Route Component
   Wrap routes that require login
------------------------------ */

const ProtectedRoute = () => {
  
  // const isLoggedIn = useSelector(
  //       state => state.auth.isLoggedIn
  //   );

  // /* -----------------------------
  //    If NOT logged in → redirect to login
  // ------------------------------ */

  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }

  // /* -----------------------------
  //    If logged in → allow access
  // ------------------------------ */

  // return <Outlet />;



const { user,loading}=useSelector((state)=>state.auth);

if(loading){

    return (
        <div>
            Loading...
        </div>
    );

}


if(!user){
    return <Navigate to="/login"/>
}

return <Outlet />
// return children;
};

export default ProtectedRoute;