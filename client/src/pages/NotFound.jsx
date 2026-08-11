import React from "react";
import { useNavigate } from "react-router-dom";
const NotFound = ()=>{

    const navigate = useNavigate();

    return(
     
     <div className="w-screen h-screen border flex flex-col justify-center items-center gap-4">
      <div className="font-bold text-4xl text-center justify-center items-center ">Not Found</div>
       <button onClick={()=>navigate(-1)} className="bg-blue-200 hover:bg-gray-200 border rounded-md justify-center items-center text-blue-700 text-xl py-1.5 px-4 mb-5">
        Back
      </button>
      </div>
    )
}

export default NotFound
