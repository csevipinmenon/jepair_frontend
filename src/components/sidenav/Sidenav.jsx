import React from "react";
import { Link } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";

function Sidenav({ logout, setShowSidenav, user }) {
  const handleLogout = () => {
    logout({ returnTo: window.location.origin });

    setShowSidenav(false);
  };

  return (
    <div className="fixed z-50 top-24 lg:top-28 left-4 right-4 sm:left-auto sm:right-auto bg-gray-800 max-h-[90vh] w-full sm:w-[300px] rounded shadow-2xl overflow-y-auto transition-all">
      
      <div className="flex flex-col items-center py-6 px-4">
        <abbr title="User" className="no-underline">
          {user ? (
            <img
              src={user.picture}
              alt="User"
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <FaUserTie className="text-5xl text-orange-500" />
          )}
        </abbr>
        <span className="mt-3 text-white font-bold text-lg text-center">
          Hello, {user.name}
        </span>
      </div>

      {/* Menu Links */}
      <ul className="flex flex-col items-center space-y-4 pb-6">
        <li className="w-4/5 text-center hover:bg-blue-500 py-2 rounded-lg transition-all">
          <Link
            to="/yourbook"
            className="font-bold text-2xl text-white block"
            onClick={() => setShowSidenav(false)}
          >
            Book
          </Link>
        </li>
        <li className="w-4/5 text-center hover:bg-blue-500 py-2 rounded-lg transition-all">
          <Link
            to="/chat"
            className="font-bold text-2xl text-white block"
            onClick={() => setShowSidenav(false)}
          >
            Chat
          </Link>
        </li>
        <li
          className="w-4/5 text-center hover:bg-blue-500 py-2 rounded-lg cursor-pointer transition-all"
          onClick={handleLogout}
        >
          <span className="font-bold text-2xl text-white">Log Out</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidenav;
