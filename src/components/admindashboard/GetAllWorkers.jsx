import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api.js";
import { Link } from "react-router-dom";

const GetAllWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/loginsingup";
      return;
    }
  })

  const fetchWorkers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/all-workers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkers(res.data);
      setFilteredWorkers(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch workers");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  useEffect(() => {
    const filtered = workers.filter(
      (worker) =>
        worker.name?.toLowerCase().includes(search.toLowerCase()) ||
        worker.email?.toLowerCase().includes(search.toLowerCase()) ||
        worker.phone?.includes(search)
    );
    setFilteredWorkers(filtered);
  }, [search, workers]);

  return (
    <div className="p-4 py-16  dark:bg-[#343a46] dark:text-white">
      <h2 className="text-center"><Link to={"/admin"} className="bg-orange-500 hover:bg-blue-500 animate-pulse py-2 px-4 rounded-lg text-white ">Back To Admin Panel</Link></h2>
      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-center mt-4 underline animate-pulse">
        All Workers
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
        <div className="text-center font-semibold text-blue-500 animate-pulse  ">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      ) : (
        <div className="overflow-x-auto w-full  dark:bg-gray-800 dark:text-white ">
          <table className="min-w-[800px] w-full border dark:border-[#343a46] border-collapse ">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2 font-bold text-lg">Name</th>
                <th className="p-2 font-bold text-lg">Email</th>
                <th className="p-2 font-bold text-lg">Phone</th>
                <th className="p-2 font-bold text-lg">Work</th>
                <th className="p-2 font-bold text-lg">Experience</th>
                <th className="p-2 font-bold text-lg">Location</th>
                <th className="p-2 font-bold text-lg">Role</th>
                <th className="p-2 font-bold text-lg">Created At</th>
              </tr>
            </thead>
            <tbody className="text-center ">
              {filteredWorkers.map((worker, idx) => (
                <tr key={idx} className="bg-white border-b-2  dark:border-[#343a46] dark:bg-gray-800 dark:text-white ">
                  <td className="p-2 font-medium">{worker.name}</td>
                  <td className="p-2">{worker.email}</td>
                  <td className="p-2">{worker.phone}</td>
                  <td className="p-2">{worker.work}</td>
                  <td className="p-2">{worker.experience}</td>
                  <td className="p-2">{worker.location}</td>
                  <td className="p-2">{worker.role}</td>
                  <td className="p-2 text-sm">
                    {new Date(worker.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetAllWorkers;
