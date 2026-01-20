import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import api from "../../api.js";
import LogOut from "../loginsingup.jsx/LogOut.jsx";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const API_URL = import.meta.env.VITE_API_URL;


const socket = io(SOCKET_URL);

const WorkerDashboard = () => {
  const [worker, setWorker] = useState(null); // Start with null
  const [orders, setOrders] = useState([]);
  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const [rating, setRating] = useState(null);

  const chatRef = useRef(null);

 

  useEffect(() => {
     const random = Math.random() * (5 - 3) + 3;
    setRating(random.toFixed(2));
    
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/loginsingup";
      return;
    }

    const fetchData = async () => {
      try {
        const profileRes = await api.get("/worker/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const workerData = profileRes.data.worker;
        setWorker(workerData);

        const ordersRes = await api.get(`/worker/orders/${workerData.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(ordersRes.data.orders || []);

        // join socket room
        socket.emit("joinRoom", { email: workerData.email });
      } catch (err) {
        console.error("Error loading worker data:", err);
        setWorker(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    socket.on("receiveMessage", ({ from, message }) => {
      setChatLog((prev) => [...prev, { from, message }]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSend = () => {
    if (!message || !worker?.email) return;
    socket.emit("sendMessage", {
      to: "jepair@admin.com",
      from: worker.email,
      message,
    });
    setChatLog((prev) => [...prev, { from: "You", message }]);
    setMessage("");
  };

  if (loading) {
    return (
      <div className="h-screen dark:bg-[#343a46] flex justify-center items-center text-blue-600 font-bold">
        Loading your dashboard...
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="h-screen flex justify-center items-center dark:bg-[#343a46]  text-red-600 font-bold">
        Failed to load worker profile. Please try logging in again.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 dark:bg-[#343a46] dark:text-white dark:py-7 bg-gray-100">
      <div className="bg-white shadow p-4  dark:bg-gray-800 dark:text-white  rounded-lg mb-6 ">
        <h1 className="text-xl font-bold mb-2 text-blue-600 text-center">
          Worker Profile
        </h1>

        <div className="flex items-center justify-between gap-4">
          <img
            src={worker.photo || "jepair1.jpg"}
            alt="photo"
            className="lg:w-[200px] lg:h-[200px] h-[100px] w-[100px]  rounded-full shadow-lg shadow-blue-400 object-cover border"
          />
          <div>
            <p>
              <strong>Name:</strong> {worker.name}
            </p>
            <p>
              <strong>⭐ </strong>{rating}
            </p>
            <p>
              <strong>Email:</strong> {worker.email}
            </p>
            <p>
              <strong>Phone:</strong> {worker.phone}
            </p>
            <p>
              <strong>Work:</strong> {worker.work}
            </p>
            <p>
              <strong>Experience:</strong> {worker.experience}
            </p>
            <p>
              <strong>Location:</strong> {worker.location}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow   dark:bg-gray-800 dark:text-white  p-4 rounded-lg mb-6">
        <h2 className="text-xl text-center font-bold text-orange-500 mb-3">
          Orders
        </h2>
        {orders.length === 0 ? (
          <p className="font-semibold text-lg">No current orders.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li
                key={order._id}
                className="border dark:border-[#343a46] p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Name:</strong>
                    {order?.name}
                  </p>
                  <p>
                    <strong>Phone:</strong>
                    {order?.phone}
                  </p>
                  <p>
                    <strong>Service:</strong>
                    {order?.service}
                  </p>
                  <p>
                    <strong>Date:</strong>
                    {order?.date}
                  </p>
                  <p>
                    <strong>Time:</strong>
                    {order?.time}
                  </p>
                  <p>
                    <strong>Town:</strong> {order.location?.town}
                  </p>
                  <p>
                    <strong>Area:</strong> {order.location?.area}
                  </p>
                  <p>
                    <strong>State:</strong> {order.location?.state}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {order.location?.pincode}
                  </p>
                </div>

                <button
                  className={`text-white px-3 py-1 rounded ${
                    cancelingOrderId === order._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={cancelingOrderId === order._id}
                  onClick={async () => {
                    const confirmed = window.confirm(
                      "Are you sure you want to cancel this order?"
                    );
                    if (!confirmed) return;

                    try {
                      setCancelingOrderId(order._id); // Show loader on this order only
                      await axios.delete(
                        `${API_URL}/api/auth/worker/orders/cancel/${order._id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      );
                      alert("Order cancell Sucessfully!");

                      // Fetch updated order list
                      const res = await axios.get(
                        `${API_URL}/api/auth/worker/orders/${worker.email}`,
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      );

                      setOrders(res.data.orders || []);
                    } catch (err) {
                      alert("Failed to cancel order. Try again.");
                      console.error(err);
                    } finally {
                      setCancelingOrderId(null); // Reset loading state
                    }
                  }}
                >
                  {cancelingOrderId === order._id ? "Cancelling..." : "Cancel"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white  dark:bg-gray-800 dark:text-white  shadow p-4 rounded-lg">
        <h2 className="text-xl font-bold text-center text-blue-600 mb-3">
          Chat with Admin
        </h2>
        <div
          ref={chatRef}
          className="h-60 overflow-y-auto border p-2 rounded  dark:text-black dark:border-[#343a46] dark:bg-gray-800   bg-gray-50 mb-2"
        >
          {chatLog.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 flex ${
                msg.from === "jepair@admin.com"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs text-sm shadow ${
                  msg.from === "jepair@admin.com"
                    ? "bg-green-200"
                    : "bg-blue-200"
                }`}
              >
                <strong className="block text-xs">
                  {msg.from === "jepair@admin.com" ? "Jepair Bazaar" : "You"}
                </strong>
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message"
            className="flex-1 p-2 border rounded focus:outline-none  dark:bg-gray-800 dark:text-white  border-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </div>
      <LogOut />
    </div>
  );
};

export default WorkerDashboard;
