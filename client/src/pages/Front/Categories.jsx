import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { categoryStart,getCategorySuccess } from "../../redux/slices/categorySlice";


const Categories = ()=>{

    const dispatch =useDispatch()
   
    useEffect(() => {
    dispatch(categoryStart());
}, [dispatch]);

    const cat = useSelector((state)=>state.category.category);
     
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("All");

    const [products,setProducts] = useState([]);

useEffect(()=>{
  const fetchProduct = async ()=>{
    const res = await getAllProducts();
     setProducts(res.products);
  }
  fetchProduct();
},[])


useEffect(() => {
    if (cat) {
        setSelectedCategory(cat);
    }
}, [cat]);


// const products = [
//   {
//     _id: 1,
//     name: "Laptop",
//     price: 50000,
//     category: "Electronics",
//     images: [{ url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" }]
//   },
//   {
//     _id: 2,
//     name: "Mobile",
//     price: 25000,
//     category: "Electronics",
//     images: [{ url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" }]
//   },
//   {
//     _id: 3,
//     name: "T-Shirt",
//     price: 700,
//     category: "Fashion",
//     images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" }]
//   },
//   {
//     _id: 4,
//     name: "Shoes",
//     price: 2500,
//     category: "Fashion",
//     images: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" }]
//   },
//   {
//     _id: 5,
//     name: "Chair",
//     price: 4000,
//     category: "Furniture",
//     images: [{ url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500" }]
//   }
// ];



    const categories = [
        "All",
        ...new Set(products.map((item) => item.category))
    ];

   

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                  (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
              );

     return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

            <div className="max-w-7xl mx-auto p-6">

                <h1 className="text-4xl font-bold mb-8">
                    Shop By Category
                </h1>

                <div className="flex gap-3 flex-wrap mb-10">

                    {categories.map((category) => (

                        <button
                            key={category}
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                            className={`px-5 py-2 rounded-full transition  border border-[var(--border)]

                            ${
                                selectedCategory === category
                                    ? "bg-blue-600 text-white"
                                    : "bg-[var(--card)] hover:text-black hover:bg-gray-200"
                            }`}
                        >
                            {category.charAt(0).toUpperCase()+category.slice(1).toLowerCase()}
                        </button>

                    ))}

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                    {filteredProducts.map((product) => (

                        <div
                            key={product._id}
                            className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow hover:shadow-xl transition"
                        >

                            <img
                                src={product.images[0]?.url}
                                alt={product.name}
                                className="h-60 w-full object-cover rounded-t-xl"
                                onClick={()=>navigate(`/product/${product._id}`)}
                            />

                            <div className="p-4">

                                <h2 className="text-xl font-semibold">
                                    {product.name.charAt(0).toUpperCase()+ product.name.slice(1).toLowerCase()}
                                </h2>

                                {/* <p className="text-gray-500 mt-1">
                                    {product.category}
                                </p> */}

                                <p className="text-blue-600 font-bold text-lg mt-3">
                                    ₹{product.price}
                                </p>

                                <button
                                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Add to Cart
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );


}

export default Categories;





























// import { useEffect, useState } from "react";
// import { getAllProducts } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import { categoryStart,getCategoriesSuccess ,getCategorySuccess} from "../redux/slices/categorySlice";
// import { useDispatch } from "react-redux";

// const Categories = ()=>{

//     const dispatch = useDispatch();
//      dispatch(categoryStart());

//     const navigate = useNavigate();
//     const [products,setProducts] = useState([]);

// useEffect(()=>{
//   const fetchProduct = async ()=>{
//     const res = await getAllProducts();
//      setProducts(res.products);

//   }
//   fetchProduct();
// },[])


//     const categories = [
//         "All",
//         ...new Set(products.map((item) => item.category))
//     ];

//      dispatch(getCategorySuccess("All"))

//     // const [selectedCategory, setSelectedCategory] = useState("All");
  
//     // const filteredProducts =
//     //     selectedCategory === "All"
//     //         ? products
//     //         : products.filter(
//     //               (item) => item.category === selectedCategory
//     //           );


//      const filteredProducts =
//         category === "All"
//             ? products
//             : products.filter(
//                   (item) => item.category === category
//               );

//      return (
//         <div className="min-h-screen bg-gray-100">

//             <div className="max-w-7xl mx-auto p-6">

//                 <h1 className="text-4xl font-bold mb-8">
//                     Shop By Category
//                 </h1>

//                 <div className="flex gap-3 flex-wrap mb-10">

//                     {categories.map((category) => (

//                         <button
//                             key={category}
//                             onClick={() =>
//                                 // setSelectedCategory(category)
//                                   dispatch(getCategorySuccess(category))
//                             }
//                             className={`px-5 py-2 rounded-full transition

//                             ${
//                                 // selectedCategory === category
//                                state.category === category
//                                     ? "bg-blue-600 text-white"
//                                     : "bg-white hover:bg-gray-200"
//                             }`}
//                         >
//                             {category}
//                         </button>

//                     ))}

//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//                     {filteredProducts.map((product) => (

//                         <div
//                             key={product._id}
//                             className="bg-white rounded-xl shadow hover:shadow-xl transition"
//                         >

//                             <img
//                                 src={product.images[0]?.url}
//                                 alt={product.name}
//                                 className="h-60 w-full object-cover rounded-t-xl"
//                                 onClick={()=>navigate(`/product/${product._id}`)}
//                             />

//                             <div className="p-4">

//                                 <h2 className="text-xl font-semibold">
//                                     {product.name}
//                                 </h2>

//                                 {/* <p className="text-gray-500 mt-1">
//                                     {product.category}
//                                 </p> */}

//                                 <p className="text-blue-600 font-bold text-lg mt-3">
//                                     ₹{product.price}
//                                 </p>

//                                 <button
//                                     className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//                                 >
//                                     Add to Cart
//                                 </button>

//                             </div>

//                         </div>

//                     ))}

//                 </div>

//             </div>

//         </div>
//     );


// }

// export default Categories;

