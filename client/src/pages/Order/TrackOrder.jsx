import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    CheckCircle,
    Package,
    Truck,
    Home,
    Clock,

} from "lucide-react";
import { useEffect, useState } from "react";
import { getOrderById } from "../../api/api";
import Track from "../../components/Track";




const TrackOrder = () => {

    const { id } = useParams();

      const [order,setOrder] =  useState(null);

//        const steps = [
//         {
//             name:"Pending",
//             icon:Clock
//        },
//      {
//           name:"Confirmed",
//           icon: CheckCircle,
//        },{
//         name:"Packed",
//          icon: Package,
//        },
//        {
//         name:"Shipped",
//            icon: Truck,
//        },
//        {
//         name:"Out For Delivery",
//           icon: Truck,
//        },
//        {
//         name:"Delivered",
//           icon: Home,
//        }   
// ];



    useEffect(()=>{
        const fetchOrderById = async ()=>{
            try{
                const res = await getOrderById(id);
                 setOrder(res.order);
                
                
            }
            catch(err){
                console.log(err.message);
            }
        }
        fetchOrderById();
    },[id])


     if(!order){
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        )
    }

    if(order.isDelivered === true){
        return (
            <>
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mt-8">

                 🎉 Your order has been delivered successfully.

            </div>
               <Track />
          </>
        )
    }

    if(order.orderStatus === "Cancelled")
        { return (<>

        <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-8">
         ❌ This order has been cancelled.

        </div>
        <Track />
        </>
        )
    }

  return (
    <Track />
  )

};

export default TrackOrder;

