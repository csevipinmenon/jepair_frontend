import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { handlerSuccess, handlerError } from "../../utils.js";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Books() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  if (!isAuthenticated) {
    loginWithRedirect();
  }

  //  Fetch all orders for this user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/order/user/${user?.email}`
        );
        setOrders(response.data.orders); //  backend should return orders array
      } catch (error) {
        handlerError("Error Fetching Orders!");
        console.error("Error fetching orders:", error);
      }
    };
    if (user?.email) fetchOrders();
  }, [user?.email]);

  // Cancel a specific order
  const orderCancel = async (orderId) => {
    const confirmed = window.confirm("Do You Want To Cancel This Order?");
    if (!confirmed) return;

    try {
      setLoading(true)
      setLoadingOrderId(orderId);
      await axios.delete(
        `${API_URL}/order/cancel/${orderId}`
      );
      handlerSuccess("Order cancelled successfully!");

      // Remove from UI
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (error) {
      console.error("Error cancelling order:", error);
      handlerError("Failed to Cancel Order!");
      alert("Failed to cancel order.");
    } finally {
      setLoadingOrderId(null);
      setLoading(false)
    }
  };

  return (
    <>
      <div className="w-full flex justify-center  py-7  dark:bg-[#343a46] dark:text-white items-center">
        <img
          src="book2.jpg"
          className="h-[400px]  rounded-lg shadow-lg shadow-blue-400 w-auto"
        />
      </div>
      <div className="mt-20 mb-40 dark:mb-0 dark:mt-0 dark:py-7 px-4 dark:bg-[#343a46] dark:text-white">
        <div className="flex flex-col items-center space-y-8">
          {orders.length === 0 ? (
            <div>
              <p className="text-gray-600 text-2xl text-center">
                No orders found.
              </p>
              <br></br>
              <br></br>
              <br></br>
              <Link to="/bookprocess" className=" text-white bg-orange-500 py-2 px-4 rounded-lg">Book Now</Link>{" "}
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={order._id}
                className="w-full max-w-4xl bg-[#f2f2f2]  dark:bg-gray-800  dark:border-[#343a46] border-2 shadow rounded-xl"
              >
                <div className="flex flex-col sm:flex-row flex-wrap justify-between gap-4  dark:bg-gray-800 bg-gray-200 px-4 py-5 rounded-t-lg">
                  <div>
                    <h3 className="font-bold">Book Placed</h3>
                    <span className="text-[#2162a1] font-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                      <br />
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold">SHIP TO</h3>
                    <span className="text-[#2162a1] font-semibold">
                      {user?.name}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold">Deliver TO</h3>
                    <span className="text-[#2162a1] font-semibold">
                      {order.date}
                    </span>
                    <br />
                    <span className="text-[#2162a1] font-semibold">
                      {order.time}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold">ORDER ID</h3>
                    <span className="text-[#2162a1] font-semibold">
                      {order._id}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start gap-6 py-4 px-4">
                  <div>
                    <h3 className="font-bold text-[#349380] text-lg">
                      Service
                    </h3>
                    <span className="text-[#2162a1] font-semibold">
                      {order.service}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#349380] text-lg">
                      Address
                    </h3>
                    <span className="text-[#2162a1] font-semibold block">
                      {order.location.area}, {order.location.town}
                    </span>
                    <span className="text-[#2162a1] font-semibold block">
                      {order.location.pincode}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#349380] text-lg">Status</h3>
                    <span
                      className={`font-bold ${
                        order.status === "Booked"
                          ? "text-blue-500"
                          : order.status === "Pending"
                          ? "text-yellow-500 animate-pulse"
                          : order.status === "Completed"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => orderCancel(order._id)}
                      className="font-bold bg-[#2162a1] hover:-translate-y-1 transition-all text-white hover:bg-orange-500 px-4 py-2 rounded-lg"
                    >
                      {loadingOrderId === order._id ? (
                        <div className="flex justify-center items-center">
                          <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-white"></div>
                        </div>
                      ) : (
                        "Cancel Book"
                      )}
                    </button>

                    <button className="font-bold px-4 bg-[#2162a1] hover:translate-y-1 transition-all text-white hover:bg-orange-500 rounded-lg py-2">
                      {loading ? (
                        <div className="flex justify-center items-center">
                          <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-white"></div>
                        </div>
                      ) : (
                        "Update Book"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Books;
