import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { getAllOrders, updateOrderStatus,deleteOrder } from "../../api/api.js";


const Orders = () => {


    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);



    // Get all orders

    const fetchOrders = async () => {

        try {

            const res = await getAllOrders();
            console.log("res order = ",res.orders);
            setOrders(res?.orders);

        }
        catch(error){

            console.log(
                "Error fetching orders",
                error
            );

        }
        finally{

            setLoading(false);

        }

    };

useEffect(()=>{
        fetchOrders();
},[]);





    // Update status

    const updateStatus = async(id,status)=>{
        try{
           const res = await updateOrderStatus({id,status});
            //  console.log("res status = ",res); 
           if(res){
                fetchOrders();
            }
        }
        catch(error){

            console.log(error);

        }


    };





    // Delete order

    const cancelOrder = async(id)=>{
        const confirmDelete =
        window.confirm(
            "Cancel this order?"
        );
        if(!confirmDelete)
            return;
        try{
        const res = await deleteOrder(id);
           if(res){
              fetchOrders();
        }
    }
        catch(error){

            console.log(error);

        }


    };





    if(loading){

        return (

            <h1 className="p-5 text-xl">
                Loading Orders...
            </h1>

        )

    }





return (

<div className="pl-6 pt-6">


<h1 className="text-3xl font-bold mb-6">

Orders

</h1>




<div className="bg-[var(--card)] h-[410px] shadow rounded-md overflow-x-auto overflow-y-auto custom-scroll  border border-[var(--border)] rounded-md ">


<table className="w-full">


<thead className="bg-[var(--bg)] sticky top-0">


<tr>


<th className="p-3 text-left">
Order ID
</th>


<th className="p-3 text-left">
Customer
</th>


<th className="p-3 text-left">
Products
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




<tbody>


{

orders.length===0 ?


<tr>

<td
colSpan="6"
className="text-center p-5"
>

No Orders Found

</td>

</tr>


:

orders.map((order)=>(


<tr

key={order._id}

className="border-b"


>



<td className="p-3">


{order._id.slice(-8)}


</td>




<td className="p-3">


<div>

<p className="font-semibold">

{
order.user?.name
}

</p>


<p className="text-sm text-[var(--secondary)]">

{
order.user?.email
}

</p>


</div>


</td>





<td className="p-3">


{

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


className="border rounded bg-[var(--bg)] p-2"



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

</select>


</td>

<td className="p-3">


<button

onClick={()=>
cancelOrder(order._id)
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


export default Orders;

