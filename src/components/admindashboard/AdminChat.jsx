import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const socket = io(SOCKET_URL);

function AdminChat() {
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/loginsingup";
      return;
    }
  })

  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", { email: "jepair@admin.com" });

    socket.on("receiveMessage", ({ from, message }) => {
      setUsers((prevUsers) =>
        prevUsers.includes(from) ? prevUsers : [...prevUsers, from]
      );

      setChatLog((prev) => ({
        ...prev,
        [from]: [...(prev[from] || []), { from, message }],
      }));

      if (!selectedUser) setSelectedUser(from);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedUser]);

  const handleSend = () => {
    if (!message || !selectedUser) return;

    socket.emit("adminMessage", {
      from: "jepair@admin.com",
      to: selectedUser,
      message,
    });

    setChatLog((prev) => ({
      ...prev,
      [selectedUser]: [
        ...(prev[selectedUser] || []),
        { from: "Admin", message },
      ],
    }));

    setMessage("");
  };

  return (
    <div className="flex h-screen p-4 dark:bg-[#343a46] dark:text-white">
    
      <div className="w-1/4 border-r dark:border-blue-400 dark:text-white border-gray-400 p-2">
        <h3 className="text-xl mb-2 mt-12 text-center text-orange-500 font-extrabold animate-pulse">
          Users
        </h3>
        <ul>
          {users.map((user) => (
            <li
              key={user}
              onClick={() => setSelectedUser(user)}
              className={`cursor-pointer p-2 rounded bg-blue-300 dark:text-black dark:hover:text-white hover:bg-blue-400 ${
                user === selectedUser ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
            >
              {user}
            </li>
          ))}
        </ul>
      </div>

    
      <div className="w-3/4 p-4">
      <h2 className="text-center">
      <Link to={"/admin"} className="bg-orange-500 hover:bg-blue-500 animate-pulse py-2 px-4 rounded-lg text-white ">Back To Admin Panel</Link></h2>
      <h2 className="text-center  font-bold text-2xl mt-4 text-orange-600 underline">Admin Chat</h2>
        <h2 className="text-xl font-extrabold py-4 text-center  text-orange-600 ">
          Chat with: {selectedUser || "None"}
        </h2>
        <div className="border bg-[#ff2f2f2] rounded h-80 overflow-y-scroll p-2 mb-4 dark:bg-gray-800 dark:text-white bg-gray-50 border-blue-400">
          {(chatLog[selectedUser] || []).map((msg, idx) => (
            <div key={idx} >
              <strong>{msg.from}:</strong> {msg.message}
            </div>
          ))}
        </div>

        <div className="mb-10">
          <input
            type="text"
            placeholder="Reply message"
            value={message}
            autoFocus
            onChange={(e) => setMessage(e.target.value)}
            className="border px-3 py-2.5 w-3/4 focus:outline-none dark:bg-gray-800 dark:text-white border-blue-500 rounded-lg focus:border-orange-500"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-orange-500 text-white px-8 py-2.5 rounded-lg  hover:bg-blue-500 font-bold mt-4 "
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminChat;
