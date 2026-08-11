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
import { getOrderById } from "../api/api";
import { useNavigate } from "react-router-dom";

   


const Track = ()=>{

 const { id } = useParams();

      const navigate = useNavigate();
      
      const [order,setOrder] =  useState(null);

       const steps = [
        {
            name:"Pending",
            icon:Clock
       },
     {
          name:"Confirmed",
          icon: CheckCircle,
       },{
        name:"Packed",
         icon: Package,
       },
       {
        name:"Shipped",
           icon: Truck,
       },
       {
        name:"Out For Delivery",
          icon: Truck,
       },
       {
        name:"Delivered",
          icon: Home,
       }   
];



let currentStep =0;

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

    useEffect(()=>{
        currentStep = steps.indexOf(order?.orderStatus);
    },[id])
      
         

   const deliveryDate = new Date(order?.createdAt);

   deliveryDate.setDate(deliveryDate.getDate() + 5);


      return (

        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]  py-10">

            <div className="max-w-5xl mx-auto bg-[var(--card)]  border border-[var(--border)]  rounded-xl shadow-lg p-8">

           <div className="flex flex-row justify-between items-center ">
            <div>
                <h1 className="text-4xl font-bold">

                    Track Order

                </h1>

                <p className="text-[var(--secondary)] mt-2">

                    Order ID : {order?._id}

                </p>

            </div>
          
          <button onClick={()=>navigate(-1)} className="bg-blue-200 hover:bg-gray-200 border rounded-md text-blue-700 text-xl py-1.5 px-4 mb-5">
               Back
            </button>
              
           </div>

                
          <div className="flex flex-row justify-between items-start">
              
               <div className="mt-8">

                    {

                        steps.map((step,index)=>{

                            const Icon = step.icon;

                            return(

                                <motion.div
                                    key={index}
                                    initial={{opacity:0,x:-30}}
                                    animate={{opacity:1,x:0}}
                                    transition={{
                                        delay:index*0.2
                                    }}
                                    className="flex items-center mb-8"
                                >

                                    <div
                                        className={`w-14 h-14 rounded-full flex items-center justify-center

                                        ${
                                           index<=currentStep
                                            ?
                                            "bg-green-500 text-white"
                                            :
                                            "bg-gray-300"
                                        }`}
                                    >

                                        <Icon/>

                                    </div>

                                    <div className="ml-6">

                                        <h2 className="text-xl font-semibold">

                                            {step.name}

                                        </h2>

                                        <p className="text-[var(--secondary)]">

                                            {

                                               index<=currentStep
                                                ?
                                                "Completed"
                                                :
                                                "Waiting"

                                            }

                                        </p>

                                    </div>

                                </motion.div>

                            )

                        })

                    }

            </div>

               <div className=" bg-[var(--bg)] rounded-lg p-5 mt-5 flex items-center gap-4">

                    <Clock className="text-blue-600"/>

                    <div>

                        <h3 className="font-bold text-[var(--)]">

                            Estimated Delivery

                        </h3>

                        <p className="text-[var(--secondary)]">
                            
                          {/* 28 Aug 2026 */}
                            {/* {deliveryDate.toISOString().split("T")[0]} */}
                   
                            {
  new Date(
    new Date(order?.createdAt).setDate(
      new Date(order?.createdAt).getDate() + 5
    )
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

                        </p>

                    </div>

                </div>
             
          </div>
           

            
            </div>

        </div>

    );

}

export default Track;