import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api.js";
import { Link } from "react-router-dom";

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/loginsingup";
      return;
    }
  })

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(
          "/allusers-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch Orders");
        
      }finally{
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.userEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4  py-16 dark:bg-[#343a46] dark:text-white">
      <h2 className="text-center">
      <Link to={"/admin"} className="bg-orange-500 hover:bg-blue-500 animate-pulse py-2 px-4 rounded-lg text-white ">Back To Admin Panel</Link></h2>
      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center mt-4 underline animate-pulse">
        All Orders
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by User Email"
          className="w-full max-w-md px-4 py-2 border border-orange-400 rounded-md  dark:bg-gray-800 dark:text-white focus:outline-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-center text-blue-500 font-semibold animate-pulse">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      ) : (
        <div className="overflow-x-auto w-full ">
          <table className="min-w-[800px] w-full border dark:border-[#343a46] border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white dark:bg-gray-800 dark:text-white">
                <th className="p-2 font-bold text-lg">User Email</th>
                <th className="p-2 font-bold text-lg">Service</th>
                <th className="p-2 font-bold text-lg">Location</th>
                <th className="p-2 font-bold text-lg">Deliver Date</th>
                <th className="p-2 font-bold text-lg">Deliver Time</th>
                <th className="p-2 font-bold text-lg">Status</th>
                <th className="p-2 font-bold text-lg">OrderId</th>
              </tr>
            </thead>
            <tbody className="text-center ">
              {filteredOrders.map((order, index) => (
                <tr key={index} className="bg-white border-b-2 dark:bg-gray-800 dark:text-white dark:border-[#343a46]">
                  <td className="p-2 font-medium">{order.userEmail}</td>
                  <td className="p-2">{order.service}</td>
                  <td className="p-2">
                    {order.location.town}, {order.location.area},{" "}
                    {order.location.state} - {order.location.pincode}
                  </td>
                  <td className="p-2">{order.date}</td>
                  <td className="p-2">{order.time}</td>
                  <td
                    className={`font-bold p-2 ${
                      order.status === "Booked"
                        ? "text-blue-500"
                        : order.status === "Pending"
                        ? "text-orange-500 animate-pulse"
                        : order.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="p-2 ">{order._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetAllOrders;
