import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getProductById, updateProduct } from "../../api/api";

const EditProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        stock: "",
        category: "",
        price: ""
    });

    const [oldImage, setOldImage] = useState("");
    const [newImage, setNewImage] = useState(null);

    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await getProductById(id);
                const data = res.product;
                setProduct({
                    name: data.name || "",
                    description: data.description || "",
                    stock: data.stock || "",
                    category: data.category || "",
                    price: data.price || ""
                });

                if (data.images && data.images.length > 0) {
                    setOldImage(data.images?.[0]?.url);
                }
            } catch (err) {
                console.log(err);
                setError(
                    err.response?.data?.message ||
                    "Failed to load product"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);


    const changeHandler = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const imageHandler = (e) => {
        const file = e.target.files[0];

        //  const files = Array.from(e.target.files);
        if (!file) return;
        setNewImage(file);
        
    //      const previewImages = files.map(file =>
    //     URL.createObjectURL(file)
    // );

        setPreview(URL.createObjectURL(file));
        // setPreview(previewImages);
    };


const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!product.name || !product.description || !product.stock || !product.category || !product.price) {
            setError("Please fill all fields");
            return;
        }
        try {
            setUpdating(true);
            const formData = new FormData();
            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("stock", product.stock);
            formData.append("category", product.category);
            formData.append("price", product.price);


            // Only send image if admin selected a new one

            if (newImage) {
                formData.append("image",newImage);
            }

            console.log("new image = ",newImage);

            // newImage.forEach((image) => {
            //   formData.append("images", image);
            //  });

            const res = await updateProduct(id, formData);

            console.log("Updated product =", res);

            setSuccess("Product updated successfully!");

            setTimeout(() => {
                navigate("/admin/products");
            }, 1200);

        } catch (err) {

            console.log(err);

            setError(
                err.response?.data?.message ||
                "Failed to update product"
            );

        } finally {

            setUpdating(false);

        }

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <div className="text-xl font-semibold">
                    Loading product...
                </div>

            </div>
        );

    }


    return (

        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-10 px-4">

            <div className="max-w-4xl mx-auto">

                {/* HEADER */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-[var(--text)]">
                            Edit Product
                        </h1>

                        <p className="text-[var(--secondary)] mt-1">
                            Update your product information
                        </p>

                    </div>


                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 bg-gray-200 text-blue-500 hover:bg-gray-300 rounded-lg"
                    >
                        Back
                    </button>

                </div>


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[var(--card)] border border-[var(--border)] text-[var(--text)] rounded-2xl shadow-lg p-8"
                >

                    {/* ERROR */}

                    {error && (

                        <div className="mb-6 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>

                    )}


                    {/* SUCCESS */}

                    {success && (

                        <div className="mb-6 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
                            {success}
                        </div>

                    )}


                    <form
                        onSubmit={submitHandler}
                        className="space-y-6"
                    >


                        {/* ================= IMAGE ================= */}

                        <div>

                            <label className="block font-semibold mb-2">
                                Product Image
                            </label>


                            <div className="flex gap-6 items-center">

                                {/* Existing / Preview */}

                                <div className="w-40 h-40 rounded-xl overflow-hidden border border-[var(--border)] ">

                                    <img
                                        src={
                                            preview ||
                                            oldImage ||
                                            "https://via.placeholder.com/300"
                                        }
                                        alt="Product"
                                        className="w-full h-full object-cover"
                                    />

                                </div>


                                <div>

                                    <label className="cursor-pointer">

                                        <div className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            Choose New Image
                                        </div>

                                        <input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={imageHandler}
                                            className="hidden"
                                        />

                                    </label>


                                    {newImage && (

                                        <p className="text-sm text-green-600 mt-2">
                                            New image selected
                                        </p>

                                    )}

                                    {!newImage && (

                                        <p className="text-sm text-[var(--secondary)] mt-2">
                                            Leave unchanged to keep current image
                                        </p>

                                    )}

                                </div>

                            </div>

                        </div>


                        {/* ================= NAME ================= */}

                        <div>

                            <label className="block font-semibold mb-2">
                                Product Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={changeHandler}
                                placeholder="Enter product name"
                                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* ================= DESCRIPTION ================= */}

                        <div>

                            <label className="block font-semibold mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={product.description}
                                onChange={changeHandler}
                                rows="5"
                                placeholder="Enter product description"
                                className="w-full border border-[var(--border)] bg-[var(--bg)] rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* ================= CATEGORY ================= */}

                        <div>

                            <label className="block font-semibold mb-2">
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={product.category}
                                onChange={changeHandler}
                                placeholder="Enter category"
                                className="w-full border border-[var(--border)] bg-[var(--bg)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* ================= PRICE + STOCK ================= */}

                        <div className="grid md:grid-cols-2 gap-6">


                            {/* PRICE */}

                            <div>

                                <label className="block font-semibold mb-2">
                                    Price (₹)
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={changeHandler}
                                    min="0"
                                    placeholder="Enter price"
                                    className="w-full border border-[var(--border)] bg-[var(--bg)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                            {/* STOCK */}

                            <div>

                                <label className="block font-semibold mb-2">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    value={product.stock}
                                    onChange={changeHandler}
                                    min="0"
                                    placeholder="Enter stock"
                                    className="w-full border border-[var(--border)] bg-[var(--bg)] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>

                        </div>


                        {/* ================= BUTTONS ================= */}

                        <div className="flex gap-4 pt-4">

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 border border-[var(--border)]  py-3 rounded-lg font-semibold bg-[var(--bg)] hover:bg-[var(--card)]"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={updating}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                            >

                                {updating
                                    ? "Updating..."
                                    : "Update Product"
                                }

                            </button>

                        </div>

                    </form>

                </motion.div>

            </div>

        </div>

    );

};

export default EditProduct;