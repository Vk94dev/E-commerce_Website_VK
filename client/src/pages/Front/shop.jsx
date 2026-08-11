import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllProducts } from "../../api/api";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  /* -----------------------------
     Get search query from URL
  ------------------------------ */

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  /* -----------------------------
     Dummy Products (replace with API later)
  ------------------------------ */

useEffect(()=>{
  const fetchProduct = async ()=>{
      const res = await getAllProducts();
      setProducts(res.products);
      setFiltered(res.products);
  }
  fetchProduct();
},[])



  // useEffect(() => {
  //   const data = [
  //     {
  //       id: 1,
  //       name: "Wireless Headphones",
  //       price: 1999,
  //       category: "electronics",
  //       image:
  //         "https://images.unsplash.com/photo-1580894908361-967195033215",
  //     },
  //     {
  //       id: 2,
  //       name: "Smart Watch",
  //       price: 3499,
  //       category: "electronics",
  //       image:
  //         "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  //     },
  //     {
  //       id: 3,
  //       name: "Gaming Mouse",
  //       price: 999,
  //       category: "electronics",
  //       image:
  //         "https://images.unsplash.com/photo-1527814050087-3793815479db",
  //     },
  //     {
  //       id: 4,
  //       name: "Running Shoes",
  //       price: 2499,
  //       category: "fashion",
  //       image:
  //         "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  //     },
  //     {
  //       id: 5,
  //       name: "T-Shirt",
  //       price: 499,
  //       category: "fashion",
  //       image:
  //         "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  //     },
  //   ];

  //   setProducts(data);
  //   setFiltered(data);
  // }, []);

  /* -----------------------------
     Search Filtering Logic
  ------------------------------ */

  useEffect(() => {
    if (!searchQuery) {
      setFiltered(products);
      return;
    }

    const result = products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFiltered(result);
  }, [searchQuery, products]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-[var(--bg)] text-[var(--text)]">


      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop Products</h1>

        {searchQuery && (
          <p className="text-[var(--secondary)] mt-2">
            Showing results for:{" "}
            <span className="font-semibold">
              "{searchQuery}"
            </span>
          </p>
        )}
      </div>

      {/* =========================
          PRODUCT GRID
      ========================= */}

      {filtered.length === 0 ? (
        <p className="text-center text-[var(--text)]">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">

          {filtered.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.03 }}
              className=" shadow-md rounded-xl overflow-hidden cursor-pointer bg-[var(--card)] border border-[var(--border)]"
              onClick={() => navigate(`/product/${item._id}`)}
            >

              <img
                src={item.images[0]?.url}
                alt={item.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">

                <h3 className="font-semibold">
                  {item.name.charAt(0).toUpperCase()+item.name.slice(1).toLowerCase()}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.category.charAt(0).toUpperCase()+item.category.slice(1).toLowerCase()}
                </p>

                <p className="text-blue-600 font-bold mt-2">
                  ₹{item.price}
                </p>

              </div>

            </motion.div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Shop;


