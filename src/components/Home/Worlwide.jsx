import React from "react";
import Counterup from "../CounterUp/Counterup";

function Worlwide() {
  return (
    <div className="bg-[#f2f2f2] dark:bg-[#343a46] dark:text-white grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-6 py-10 md:py-16">
      <div className="md:col-span-4 flex justify-center items-center">
        <img src="worldMap.jpg" className="w-full max-w-xs md:max-w-full dark:rounded-3xl dark:shadow-lg dark:shadow-blue-400" />
      </div>

      <div className="md:col-span-8 flex flex-col items-center justify-center px-2 md:px-6">
        <h1 className="font-extrabold text-3xl md:text-5xl text-blue-500 text-center">
          Worldwide movement
        </h1>
        <p className="mt-5 md:mt-7 text-base md:text-lg text-center md:text-left">
          Besides India, there are Jepair Bazaar in Germany, France, the United
          Kingdom, the United States and in dozens of other countries around the
          world. Jepair Bazaar has even made its way to Nepal and Japan!
        </p>

        <div className="mt-10 md:mt-16 flex flex-col lg:flex-row justify-evenly items-center gap-8 w-full">
          <div className="text-center">
            <Counterup end="3678" duration={"4"} />
            <h3 className="mt-4 font-semibold text-lg dark:text-blue-300 text-blue-700">
              Jepair Bazaar
            </h3>
          </div>

          <div className="text-center">
            <Counterup end="54795" duration={"4"} />
            <h3 className="mt-4 font-semibold text-lg dark:text-blue-300 text-blue-700">
              Estimated number of
              <br />
              volunteers involved
            </h3>
          </div>

          <div className="text-center">
            <Counterup end="65754" duration={"4"} />
            <h3 className="mt-4 font-semibold text-lg dark:text-blue-300 text-blue-700">
              Estimated number of
              <br />
              items repaired per month
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Worlwide;
