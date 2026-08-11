import React,{useState} from "react";
import api from "../../api/axios.js"
import { createProduct } from "../../api/api.js";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";




const AddProduct=()=>{

    const navigate = useNavigate();

  const fileInputRef = useRef(null);

const [product,setProduct]=useState({
name:"",
category:"",
price:"",
stock:"",
description:""
});

const [images, setImages] = useState([]);
const [preview, setPreview] = useState([]);

const imageHandler = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previewImages = files.map(file =>
        URL.createObjectURL(file)
    );

    setPreview(previewImages);
};

const submitHandler= async (e)=>{

e.preventDefault();

const formData = new FormData();

formData.append("name", product.name);
formData.append("price", product.price);
formData.append("category", product.category);
formData.append("stock", product.stock);
formData.append("description", product.description);

images.forEach((image) => {
    formData.append("images", image);
});

const res = await createProduct(formData);
if(res){
   setProduct({
         name:"",
         category:"",
         price:"",
         stock:"",
         description:""
});
     setImages([])
    setPreview([]);
    if (fileInputRef.current) {
    fileInputRef.current.value = "";
}

}


}



return(

<div className="px-6">

<div className="flex flex-row justify-between items-center">
<h1 className="text-3xl font-bold mb-5">
Add Product
</h1>

 <button onClick={()=>navigate(-1)} className="bg-blue-200 hover:bg-gray-200 border rounded-md text-blue-700 text-xl py-1.5 px-4 mb-5">
   Back
</button>
</div>


<form 
onSubmit={submitHandler}
className="bg-[var(--card)] p-5 rounded border border-[var(--border)] shadow flex flex-row gap-5"
>

<div className="flex flex-col w-full  ">
<input

className="bg-[var(--bg)] outline-none border border-[var(--border)] rounded  p-3 w-full mb-3"

placeholder="Product Name"
value={product.name}
onChange={(e)=>
setProduct({
...product,
name:e.target.value
})
}

/>

 <input
 className="bg-[var(--bg)] outline-none border border-[var(--border)] rounded p-3 w-full mb-3"
 placeholder="Category"
 value={product.category}
 onChange={
 e=>setProduct({
 ...product,
 category:e.target.value
 })
 }
 />



<input

className="bg-[var(--bg)] outline-none border border-[var(--border)] rounded  p-3 w-full mb-3"

placeholder="Price"
value={product.price}
onChange = {(e)=>
setProduct({
...product,
price:e.target.value
})
}

/>


 <input
 className="bg-[var(--bg)] outline-none border border-[var(--border)] rounded  p-3 w-full mb-3"
 placeholder="Stock"
 value={product.stock}
 onChange={
 e=>setProduct({
 ...product,
 stock:e.target.value
 })
 }

/>


<textarea

className="bg-[var(--bg)] outline-none border border-[var(--border)] rounded  p-3 w-full mb-3"

placeholder="Description"
value={product.description}

onChange={(e)=>
setProduct({
...product,
description:e.target.value
})
}

/>



<button type="submit"
className="bg-black hover:bg-zinc-700 border border-[var(--border)] text-white px-5 py-3 rounded w-[30%]"
>

Add Product

</button>
</div>

{/* <div className="border w-[40%] h-[40%] p-2 rounded-sm">
  <img src="https://images.unsplash.com/photo-1580894908361-967195033215" alt="photo" className="object-cover rounded-sm"/>
</div> */}

<div className="border border-[var(--border)] bg-[var(--bg)] outline-none rounded w-[40%] h-[40%] p-2 rounded-sm">

    <input
        ref={fileInputRef}
        type="file"
        name="images"
        multiple
        className=""
        accept="image/*"
        onChange={imageHandler}
    />

    <div className="flex gap-2 mt-2 flex-wrap">
        {preview.map((img, index) => (
            <img
                key={index}
                src={img}
                alt="preview"
                className="w-24 h-24 object-cover rounded"
            />
        ))}
    </div>

</div>

</form>



</div>


)

}


export default AddProduct;













// import {useState} from "react";
// import api from "../../api/axios.js";
// import {useNavigate} from "react-router-dom";


// const AddProduct=()=>{


// const navigate=useNavigate();



// const [product,setProduct]=useState({

// name:"",
// price:"",
// description:"",
// category:"",
// stock:""

// });




// const submitHandler=async(e)=>{


// e.preventDefault();


// await api.post(
// "/products",
// product
// );


// navigate("/admin/products");


// };




// return(

// <form onSubmit={submitHandler}>


// <input
// placeholder="Name"

// onChange={
// e=>setProduct({
// ...product,
// name:e.target.value
// })
// }
// />



// <input
// placeholder="Price"

// onChange={
// e=>setProduct({
// ...product,
// price:e.target.value
// })
// }
// />



// <input
// placeholder="Category"

// onChange={
// e=>setProduct({
// ...product,
// category:e.target.value
// })
// }
// />




// <textarea

// placeholder="Description"

// onChange={
// e=>setProduct({
// ...product,
// description:e.target.value
// })
// }

// />



// <input

// placeholder="Stock"

// onChange={
// e=>setProduct({
// ...product,
// stock:e.target.value
// })
// }

// />



// <button>
// Create Product
// </button>



// </form>

// )


// }


// export default AddProduct;


