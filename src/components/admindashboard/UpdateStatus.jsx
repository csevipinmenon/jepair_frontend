import React from "react";
import { useState } from "react";
import { handlerError, handlerSuccess } from "../../utils.js";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import api from "../../api.js";
import { Link } from "react-router-dom";

function UpdateStatus() {
  const [status, setStatus] = useState("");
  const [id, setid] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/loginsingup";
      return;
    }
  });

  const updateStatusOrder = async (e) => {
    e.preventDefault();
    if (!status || !id) {
      console.log(status);
      console.log(id);

      return handlerError("ALL fields Are required");
    }
    const value = confirm("Do You Want to update Status?");
    if (!value) {
      return handlerError(" Don't Worry Not Update!");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await api.put(
        `/update/orderstatus/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handlerSuccess("Status Update SucessFully!");
      setid("");
      setStatus("");
    } catch (error) {
      handlerError("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center py-7 dark:bg-[#343a46] dark:text-white">
       <h2 className="text-center py-3"><Link to={"/admin"} className="bg-orange-500 hover:bg-blue-500 animate-pulse py-2 px-4 rounded-lg text-white ">Back To Admin Panel</Link></h2>
      <div className="font-extrabold text-xl border-b-2 py-2.5 dark:border-gray-800 text-orange-500">
       
        <h2 className="text-center py-2 underline text-orange-600">Update User Order</h2>
      
      </div>
      <form onSubmit={updateStatusOrder}>
        <div className="">
          <h3 className="py-4 font-bold text-lg ">
            Select order Status to set
          </h3>
          <select
            value={status}
            required
            onChange={(e) => setStatus(e.target.value)}
            className="border px-2 py-2.5 rounded-lg  mt-4 mb-6  dark:bg-gray-800 dark:text-white border-blue-500 w-96 "
          >
            <option value="" disabled>
              Select Book Status
            </option>
            <option value="Booked">Booked</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <h3 className="font-bold text-lg">Enter Order Id </h3>
          <input
            type="text"
            value={id}
            onChange={(e) => setid(e.target.value)}
            placeholder="Enter order Id "
            name="orderId"
            required
            className="mt-3 w-96 py-2 px-4 border border-blue-500  dark:bg-gray-800 dark:text-white focus:outline-none focus:border-orange-500 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="mt-10 w-96 bg-blue-500 py-2.5 px-10 text-white font-bold rounded-xl hover:bg-orange-500"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-white"></div>
            </div>
          ) : (
            "Update Status"
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UpdateStatus;
