import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api.js";
import { Link } from "react-router-dom";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState("");

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/loginsingup";
      return;
    }
   })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(
          "/allusers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(res.data.users);
        setFilteredUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to Fetch Users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.phone?.includes(search)
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  return (
    <div className="p-4 py-16 dark:bg-[#343a46] dark:text-white">
      <h2 className="text-center"><Link to={"/admin"} className="bg-orange-500 hover:bg-blue-500 animate-pulse py-2 px-4 rounded-lg text-white ">Back To Admin Panel</Link></h2>
      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center mt-4 underline animate-pulse">
        All Users
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or phone"
          className="w-full max-w-md px-4 py-2 border border-orange-400 dark:bg-gray-800 dark:text-white rounded-md focus:outline-blue-500"
        />
      </div>

      {loading ? (
        <div className="text-center text-blue-500 font-semibold  animate-pulse">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-[600px] w-full border border-collapse dark:bg-gray-800 dark:border-[#343a46] dark:text-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2 font-extrabold text-xl">Name</th>
                <th className="p-2 font-extrabold text-xl">Email</th>
                <th className="p-2 font-extrabold text-xl">Phone</th>
                <th className="p-2 font-extrabold text-xl">Role</th>
              </tr>
            </thead>
            <tbody className="text-center   ">
              {filteredUsers.map((u, index) => (
                <tr key={index} className="bg-white border-b-2 dark:border-[#343a46] dark:bg-gray-800 dark:text-white">
                  <td className="p-2 text-lg font-semibold">{u.name}</td>
                  <td className="p-2 text-lg font-semibold">{u.email}</td>
                  <td className="p-2 text-lg font-semibold">
                    {u.phone || "N/A"}
                  </td>
                  <td className="p-2 text-lg font-semibold">
                    {u.role || "user"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllUsers;
