import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminDashboard } from "../../api/api";

const AdminDashboard = () => {
  
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const resp = await adminDashboard();
        setDetails(resp);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className="p-6 bg-[var(--bg)]  text-[var(--text)]">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-[var(--card)] border border-[var(--border)] shadow rounded p-5">
          <h2 className="text-[--secondary] mb-3">Total Users</h2>

          <p className="text-3xl font-bold">
            {details?.totalUsers}
          </p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] shadow rounded p-5">
          <h2 className="text-[var(--secondary)] mb-3">Total Products</h2>

          <p className="text-3xl font-bold">{details?.totalProducts}</p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] shadow rounded p-5">
          <h2 className="text-gray-500 mb-3">Total Orders</h2>

          <p className="text-3xl font-bold">{details?.totalOrders}</p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] shadow rounded p-5">
          <h2 className="text-gray-500 mb-3">Revenue</h2>

          <p className="text-3xl font-semibold">
            {/* ₹50000 */}₹ {details?.totalRevenue[0].revenue}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/admin/products"
          className="bg-black border border-[var(--border)] text-white hover:bg-zinc-800 px-5 py-3 rounded"
        >
          Manage Products
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
