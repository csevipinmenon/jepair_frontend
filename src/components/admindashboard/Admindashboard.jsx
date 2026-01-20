import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import LogOut from "../loginsingup.jsx/LogOut";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handlerError, handlerSuccess } from "../../utils.js";
import api from "../../api.js";

function Admindashboard() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/loginsingup";
      return;
    }
  });

  const handleExport = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.get("/export-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", 
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "users.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      handlerSuccess("Export ALL users Successfully!");
    } catch (error) {
      handlerError("Failed to Export All users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-[#343a46] dark:text-white">
      <div className="w-full flex flex-col items-center justify-center dark:bg-[#343a46] dark:text-white bg-[#f2f2f2] relative px-4 py-4">
        <h1 className="text-center text-4xl sm:text-5xl font-extrabold animate-bounce text-[#ff7f00] mb-6 sm:mb-0 z-10">
          Admin
        </h1>

        <img
          src="vipin.jpg"
          alt="Enquiry"
          className="h-[250px] sm:h-[350px] w-auto rounded-lg shadow-xl hover:-translate-y-1 shadow-blue-200"
        />
      </div>
      <div className="w-full py-2 dark:bg-[#343a46] dark:text-white mb-16">
        <h3 className="text-center text-2xl font-bold animate-pulse text-orange-400 py-4 underline">
          Active Link
        </h3>

        <div className="overflow-x-auto dark:bg-[#343a46] dark:text-white m-2 ">
          <ul className="flex gap-4 sm:justify-between  w-max sm:w-full px-4 sm:px-0 dark:bg-[#343a46] ">
            {[
              { path: "/adminallusers", label: "1. All Users" },
              { path: "/adminallworkers", label: "2. All Workers" },
              { path: "/adminupdatestatus", label: "3. Update Order Status" },
              { path: "/adminchat", label: "4. Admin Chat" },
              { path: "/adminallorders", label: "5. All Users Orders" },
              {
                path: "/adminassignordertoworker",
                label: "6. Assign Order To Worker",
              },
            ].map(({ path, label }, index) => (
              <li
                key={index}
                className="bg-blue-500 min-w-max py-2 px-4  dark:text-white hover:bg-orange-400 rounded-xl text-center whitespace-nowrap"
              >
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `font-bold ${isActive ? "text-red-400" : "text-white"}`
                  }
                >
                  {label}
                  <span className="animate-pulse ml-2 text-white text-xl">
                    ➤
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <span>
          {" "}
          <button
            className="bg-blue-500 p-2 rounded-lg text-white mt-4 font-bold hover:bg-orange-500 ml-2 flex items-center justify-center gap-2 min-w-[180px]"
            onClick={handleExport}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <span>Exporting...</span>
              </>
            ) : (
              "7.Export All Users"
            )}
          </button>
        </span>
      </div>
      <LogOut />
      <ToastContainer />
    </div>
  );
}

export default Admindashboard;
