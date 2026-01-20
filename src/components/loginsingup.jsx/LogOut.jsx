import api from "../../api.js";
import React from "react";

function LogOut() {
  const handleLogout = async () => {
    try {
      await api.post("/logout"); // remove HTTP-only cookie
      localStorage.removeItem("token"); // remove access token
      window.location.href = "/loginsingup"; // redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div className="text-center py-7">
      <button
        onClick={handleLogout}
        className="bg-orange-500  py-2 font-bold animate-pulse  text-white  px-4 hover:bg-blue-500 rounded-lg"
      >
        Log Out
      </button>
    </div>
  );
}

export default LogOut;
