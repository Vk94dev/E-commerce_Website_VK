import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

import { getAllProducts } from "../../api/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getAllProducts();

      const data = res.products || res;

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setKeyword(value);

    if (!value) {
      setFilteredProducts(products);
      return;
    }

    const result = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(result);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      // await deleteProduct(id);

      toast.success("Product deleted");

      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="px-6 pt-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Product Management
          </h1>

          <p className="text-[var(--secondary)] mt-1">
            Manage all products
          </p>

        </div>

        <Link
          to="/admin/add-product"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
          Add Product
        </Link>

      </div>

      {/* Search */}

      <div className="relative mb-6">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          value={keyword}
          onChange={handleSearch}
          placeholder="Search product..."
          className="w-full outline-none  rounded-lg py-3 pl-12 pr-4 bg-[var(--card)] border border-[var(--border)]"
        />

      </div>

      {/* Table */}

      <div className="bg-[var(--card)] h-[335px] rounded-xl shadow overflow-x-auto overflow-y-auto overflow-hidden custom-scroll border  border-[var(--border)] ">

        <table className="w-full">

          <thead className="bg-[var(--bg)] sticky top-0">

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

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-10"
                >
                  Loading...
                </td>

              </tr>

            ) : filteredProducts.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-10"
                >
                  No products found
                </td>

              </tr>

            ) : (

              filteredProducts.map((product) => (

                <tr
                  key={product._id}
                  className="border-t"
                >

                  <td className="p-4">

                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                  </td>

                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="bg-yellow-500 text-white p-2 rounded"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(product._id)
                        }
                        className="bg-red-600 text-white p-2 rounded"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Product;



