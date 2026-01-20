import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import api from "../../api.js";
import { Link } from "react-router-dom";

const AssignOrderToWorker = () => {
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/loginsingup";
      return;
    }
   });

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    town: "",
    state: "",
    pincode: "",
    area: "",
    service: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/worker/orderbyadmin",
        formData ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order assigned successfully!");
      setFormData({
        email: "",
        name: "",
        phone: "",
        town: "",
        state: "",
        pincode: "",
        area: "",
        service: "",
        date: "",
        time: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto  mt-10 px-4 py-7">
     <h2 className="text-center py-3"> <Link to={"/admin"} className="bg-orange-500  hover:bg-blue-500 animate-pulse py-2 px-4 rounded-lg text-white ">Back To Admin Panel</Link></h2>
      <h2 className="text-2xl font-bold text-center mb-6 py-2  text-orange-500 animate-pulse underline">
        Assign Order to Worker
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {[
          { label: " Worker Email", name: "email", type: "email" },
          { label: "User Name", name: "name", type: "text" },
          { label: " User Phone", name: "phone", type: "text" },
          { label: "User Town", name: "town", type: "text" },
          { label: " User State", name: "state", type: "text" },
          { label: "User Pincode", name: "pincode", type: "text" },
          { label: "User Area", name: "area", type: "text" },
          { label: "User Service", name: "service", type: "text" },
          { label: "User Date", name: "date", type: "date" },
          { label: "User Time", name: "time", type: "time" },
        ].map(({ label, name, type }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="font-semibold mb-1">
              {label} <span className="text-red-500">*</span>
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="border border-orange-400 px-3 py-2 rounded focus:outline-blue-500"
            />
          </div>
        ))}
        <div className="sm:col-span-2 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-white"></div>
              </div>
            ) : (
              "Submit Order"
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AssignOrderToWorker;
