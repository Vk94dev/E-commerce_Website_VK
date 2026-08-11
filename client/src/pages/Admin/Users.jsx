import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/api";

const Users=()=>{

const [users,setUsers] = useState([]);

    const [loading , setLoading] = useState(true);

useEffect(()=>{

   const fetchUsers = async ()=>{
     try{
        const res = await getAllUsers();
        console.log("users = ",res);
        setUsers(res.users);

     }
     catch(err){
        console.log(err.message);
     }
   }
   fetchUsers();
},[])


// if(loading){

//         return (

//             <h1 className="p-5 text-xl">
//                 Loading Orders...
//             </h1>

//         )

//     }


return(

<div className="pl-6 pt-6">


<h1 className="text-3xl font-bold">
Users
</h1>

<div className="bg-[var(--card)] h-[430px] shadow rounded overflow-x-auto overflow-y-auto custom-scroll border border-[var(--border)] rounded-md ">


<table className="w-full ">


<thead className="bg-[var(--bg)] sticky top-0">
<tr >
<th className="p-3 text-left">
User Email
</th>
<th className="p-3 text-left">
    User
</th>
<th className="p-3 text-left">
Created Date
</th>
<th className="p-3 text-left">
Amount
</th>
<th className="p-3 text-left">
Status
</th>
<th className="p-3 text-left">
Action
</th>
</tr>
</thead>


{/* <thead className="bg-gray-100 sticky top-0">

            <tr>

              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Stock</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead> */}




<tbody>


{

users.length===0  ?


<tr>

<td
colSpan="6"
className="text-center p-5"
>

No Users Found

</td>

</tr>


:

users.map((user)=>(


<tr

key={user._id}

className="border-b"


>



<td className="p-3">


{user.email}


</td>




<td className="p-3">


<div>

<p className="font-semibold">

{
user?.name
}

</p>


{/* <p className="text-sm text-gray-500">

{
order.user?.email
}

</p> */}


</div>


</td>

<td className="p-3">


{user.createdAt.split("T")[0]}


</td>




<td className="p-3">


{/* {

order.orderItems?.map(
(item,index)=>(

<p key={index}>

{
item?.name.at(0).toUpperCase()+item?.name.slice(1).toLowerCase()
}
×
{item?.quantity}
</p>
)
)
}
</td>

<td className="p-3 font-semibold">
₹ {order.totalPrice}
</td>






<td className="p-3">


<select


value={order.orderStatus}


onChange={(e)=>

updateStatus(
order._id,
e.target.value
)

}


className="border rounded p-2"



>


<option>
Pending
</option>

<option>
Confirmed
</option>

<option>
Packed
</option>


<option>
Shipped
</option>

<option>
Out for Delivery
</option>


<option>
Delivered
</option>



<option>
Cancelled
</option>

</select> */}


</td>

<td className="p-3">


<button

onClick={()=>
cancelOrder(user._id)
}


className="bg-red-600  hover:bg-red-500 text-white px-3 py-2 rounded"


>

Cancel

</button>


</td>



</tr>


))


}



</tbody>



</table>


</div>



</div>

)


}








export default Users;