import React from "react";
import { useState } from "react";
import MapComponent from "../Map/MapComponent";

function Visit() {
  const [city, SetCity] = useState("");

  const searchJepair = (e) => {
    e.preventDefault();
    SetCity(e.target.value);
    console.log(city);
  };
  return (
    <div className="w-full py-7 dark:bg-[#343a46] ">
      <div className="w-full">
        <div className="w-full flex justify-center items-center ">
          <img src="visit.png" className="w-auto h-[300px] dark:rounded-xl dark:shadow-lg mb-4 dark:shadow-blue-400" />
        </div>
        <div className="overflow-hidden mt-4 border border-t-2">
          <MapComponent />
        </div>
        <div className="w-full shadow flex justify-center bg-[#11294c] p-6">
          <div className=" text-white">
            <h3 className="font-bold text-xl">
              Visit one of our 5 Jepair Bazaar
            </h3>
          </div>
        </div>
        <div className="w-full bg-[#f2f2f2] dark:bg-[#343a46] dark:text-white p-6 sm:p-10 flex justify-center">
          <form
            onSubmit={searchJepair}
            className="w-full max-w-4xl flex flex-col lg:flex-row items-center"
          >
            <label
              htmlFor="city"
              className="block font-bold text-blue-500 mb-3 text-xl text-center w-full"
            >
              Enter the name of your hometown
            </label>

            <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-4 mt-2">
              <input
                type="text"
                id="city"
                name="city"
                required
                className="w-full lg:w-[60%] py-2.5 px-4 bg-[#f2f2ff]  dark:bg-[#343a46] dark:text-white rounded focus:outline-none border border-blue-300"
              />

              <button
                type="submit"
                className="w-full lg:w-auto bg-[#ff7f00] px-10 py-2.5 font-bold text-xl text-white rounded-md hover:bg-[#3a76cb] transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Visit;
