import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  // Get categories

  const fetchCategories = async () => {
    const res = await api.get("/categories");

    console.log("categories = ", res.data);

    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add and update

  const submitHandler = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/categories/${editId}`, category);

      setEditId(null);
    } else {
      await api.post("/categories", category);
    }
    setCategory({
      name: "",
      description: "",
    });
    fetchCategories();
  };

  // Delete

  const handledelete = async (id) => {
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  // Edit

  const editCategory = (item) => {
    setCategory({
      name: item.name,
      description: item.description,
    });
    setEditId(item._id);
  };

  return (
    <div className="px-6 pt-6 ">
      <h1 className="text-3xl font-bold mb-5">Categories</h1>

      {/* Form */}

      <form
        onSubmit={submitHandler}
        className="bg-[var(--card)] border border-[var(--border)] shadow p-5 rounded mb-8"
      >
        <input
          className="outline-none bg-[var(--bg)] border border-[var(--border)] rounded-md p-3 w-full mb-3"
          placeholder="Category Name"
          value={category.name}
          onChange={(e) =>
            setCategory({
              ...category,

              name: e.target.value,
            })
          }
        />

        <textarea
          className="bg-[var(--bg)] outline-none border border-[var(--border)] rounded-md p-3 w-full mb-3"
          placeholder="Description"
          value={category.description}
          onChange={(e) =>
            setCategory({
              ...category,

              description: e.target.value,
            })
          }
        />

        <button className="bg-black text-white border border-[var(--border)] px-5 py-3 rounded">
          {editId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* Category Table */}

      {/* <table className="w-full bg-white shadow">


<thead>


<tr className="border">


<th className="p-3">
Name
</th>


<th>
Description
</th>


<th>
Action
</th>


</tr>


</thead>




<tbody >


{

categories.map((item)=>(


<tr

key={item._id}

className="border "


>


<td className="p-3">

{item.name}

</td>



<td>

{item.description}

</td>



<td>



<button

className="text-blue-600 mr-5"

onClick={()=>editCategory(item)}

>

Edit

</button>
<button

className="text-red-600"

onClick={()=>
deleteCategory(item._id)
}

>

Delete

</button>



</td>


</tr>


))

}



</tbody>


</table> */}

      <div className="bg-[var(--card)] h-[150px] rounded-xl shadow overflow-x-auto overflow-y-auto overflow-hidden custom-scroll border border-[var(--border)]">
        <table className="w-full">
          <thead className="bg-[var(--bg)] sticky top-0">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* {loading ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-10"
                >
                  Loading...
                </td>

              </tr>

            ) : */}
            {categories.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  No Category found
                </td>
              </tr>
            ) : (
              categories.map((item) => (
                <tr key={item._id} className="border-t ">
                  <td className="p-4">{item.name}</td>

                  <td className="p-4">{item?.description}</td>

                  <td className="p-4">
                    <div className="flex justify-start gap-3">
                      <Link
                        to={`/admin/product/edit/${item._id}`}
                        className="bg-yellow-500 text-white p-2 rounded"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(item._id)}
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

export default Categories;
