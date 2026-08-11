import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllProducts, getCategories } from "../../api/api";
import { useDispatch } from "react-redux";
import { categoryStart,getCategorySuccess } from "../../redux/slices/categorySlice";

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const [products, setProducts] = useState([]);
  const [categories,setCategories] = useState([]);

useEffect((e)=>{
  const fetchProduct = async ()=>{
        const res =  await getAllProducts();
       
        setProducts(res.products);
  }
  fetchProduct();
},[])

useEffect(()=>{
  const fetchCategory = async ()=>{
        const res =  await getCategories();
        //  console.log(res);
        setCategories(res);
  }
  fetchCategory();
},[])

// useEffect(()=>{
//  console.log(categories);
// },[])


  // useEffect((e) => {
  //   const dummyProducts = [
  //     {
  //       id: 1,
  //       name: "Wireless Headphones",
  //       price: 1999,
  //       image:
  //         "https://images.unsplash.com/photo-1580894908361-967195033215",
  //     },
  //     {
  //       id: 2,
  //       name: "Smart Watch",
  //       price: 3499,
  //       image:
  //         "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  //     },
  //     {
  //       id: 3,
  //       name: "Gaming Mouse",
  //       price: 999,
  //       image:
  //         "https://images.unsplash.com/photo-1527814050087-3793815479db",
  //     },
  //   ];


  //   // const product = await getAllProducts();

  //   setProducts(dummyProducts);
  // }, []);


    const  handleCategory = (category)=>{
     try{
      dispatch(categoryStart())
      dispatch(getCategorySuccess(category));
      navigate("/categories");
     }
     catch(err){
      console.log(err.message);
     }
    }

 


  return (
    <div className="w-full text-[var(--text)] bg-[var(--bg)] ">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
              Shop the Best Deals Online
            </h1>
            <p className="mt-4 text-lg text-white ">
              Discover top quality products at unbeatable prices.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-6 bg-[var(--bg)] hover:text-[var(--text)] text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-[var(--card)]"
            >
              Shop Now
            </button>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
            alt="hero"
            className="md:w-1/2 mt-10 md:mt-0 rounded-xl shadow-lg "
          />

        </div>
      </section>

      {/* =========================
          CATEGORIES SECTION
      ========================= */}

      <section className="max-w-7xl mx-auto px-6 py-16  ">

        <h2 className="text-2xl font-bold mb-8 ">
          Featured Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {/* {["Electronics", "Fashion", "Home", "Beauty"].map( */}
          {categories.map((category) => (
              <motion.div
                key={category._id}
                whileHover={{ scale: 1.05 }}
                className=" shadow-md p-6 rounded-xl text-center cursor-pointer  bg-[var(--card)]
  border
  border-[var(--border)]"
                onClick={() =>handleCategory(category.name) }
              >
                <h3 className="font-semibold ">{category.name.charAt(0).toUpperCase()+category.name.slice(1).toLowerCase()}</h3>
              </motion.div>
            )
          )}

        </div>

      </section>

      {/* =========================
          PRODUCTS SECTION
      ========================= */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-2xl font-bold mb-8">
          Best Selling Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {products.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.03 }}
              className="bg-[var(--card)] border border-[var(--border)]  shadow-md rounded-xl overflow-hidden cursor-pointer"
              onClick={() => navigate(`/product/${item._id}`)}
            >

              <img
                src={item.images[0]?.url}
                alt={item.name}
                className="h-48 w-full object-cover"
              />


{/* <img
    src={item.images[0]?.url.replace(
    "/upload/",
    "/upload/w_1000,h_1000,c_fill,q_auto,f_auto/"
    )}
    alt={item.name}
    className="w-40 h-40 object-cover rounded"
/> */}

              <div className="p-4">
                <h3 className="font-semibold">{item.name.charAt(0).toUpperCase()+item.name.slice(1).toLowerCase()}</h3>
                <p className="text-blue-600 font-bold mt-2">
                  ₹{item.price}
                </p>
              </div>

            </motion.div>
          ))}

        </div>

      </section>

      {/* =========================
          PROMO BANNER
      ========================= */}

      <section className="bg-black text-white border border-[var(--border)] py-16 mt-10">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold">
            Big Sale is Live!
          </h2>

          <p className="mt-3 text-gray-300 cursor-pointer">
            Up to 70% off on selected items
          </p>

          <button
            onClick={() => navigate("/deals")}
            className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-300"
          >
            Explore Deals
          </button>

        </div>

      </section>

    </div>
  );
};

export default Home;