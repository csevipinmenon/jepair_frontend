import React from "react";
import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div className="min-h-screen  dark:bg-[#343a46] dark:text-white flex flex-col justify-center items-center bg-[#fefcf7] p-4 text-center">
      <img
        src={"https://media1.tenor.com/m/M-TvdONlGAUAAAAd/theecards-sad-gif.gif"}
        alt="No Data Found"
        className="w-[300px] max-w-full rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-6 text-red-500">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 dark:text-white  mt-2 mb-4">Oops! The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-orange-500 font-semibold transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
