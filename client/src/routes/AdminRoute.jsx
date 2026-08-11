import {Navigate,Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../api/api";
import { useEffect } from "react";

const AdminRoute=()=>{

//  const user = useSelector((state) => state.auth.user);
const user_role =JSON.parse(localStorage.getItem("user-role"|| "user"));

if(!user_role)
{
   return <Navigate to="/login"/>
}

if(user_role!=="admin")
{
   return <Navigate to="/"/>
}
return <Outlet/>;
}
export default AdminRoute;