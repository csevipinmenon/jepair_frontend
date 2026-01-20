import React, { useState } from "react";
import Emailotp from "../msg/Emailotp";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handlerError, handlerSuccess } from "../../utils.js";

const API_URL = import.meta.env.VITE_API_URL;

function Enquiry() {
  const [showEmailotp, setEmailotp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [enquiryInfo, setEnquiryInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyEnquiryInfo = { ...enquiryInfo };
    copyEnquiryInfo[name] = value;
    setEnquiryInfo(copyEnquiryInfo);
  };

  const enquiryFunction = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = enquiryInfo;
    if (!name || !email || !phone || !message) {
      return handlerError("Please fill all fields");
    }
    try {
      setLoading(true); // Start loader
      const url = `${API_URL}/enquiry`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enquiryInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        setEmailotp((prev) => !prev);
        enquiryInfo.name = "";
        enquiryInfo.email = "";
        enquiryInfo.phone = "";
        enquiryInfo.message = "";
      } else if (error?.details) {
        const details = error.details[0].message;
        handlerError(details);
      } else {
        handlerError(message || "something went wrong");
      }
    } catch (error) {
      handlerError("Network error or server unavailable");
    } finally {
      setLoading(false); // Stop loader
    }
  };
  return (
    <div className="py-7 dark:bg-[#343a46] ">
      <div>
        {showEmailotp && <Emailotp />}
        <div className="w-full flex flex-col items-center py-7 dark:bg-[#343a46]  dark:text-white  justify-center bg-[#f2f2f2] relative px-4 ">
          
          <h1 className="text-center text-4xl sm:text-5xl font-extrabold animate-bounce text-[#ff7f00] mb-6 sm:mb-0 z-10">
            Enquiry
          </h1>

         
          <img
            src="enquiry.png"
            alt="Enquiry"
            className="h-[250px] sm:h-[350px] w-auto rounded-lg shadow-xl shadow-blue-200"
          />
        </div>

        <div className="flex justify-center items-center dark:bg-[#343a46]  dark:text-white px-4 md:px-10 rounded-2xl mb-40 shadow-xl">
          <form
            onSubmit={enquiryFunction}
            className=" w-full max-w-4xl rounded-lg dark:bg-gray-800 dark:text-white dark:py-6 dark:mt-10 dark:rounded-xl"
          >
            <div className="mt-10 flex justify-center">
              <h1 className="bg-[#3a76cb] py-4 px-6 sm:px-24 lg:px-52 text-center rounded text-white font-bold text-xl w-full max-w-3xl">
                Post Your Requirements
              </h1>
            </div>

            
            <div className="mt-6 flex flex-col sm:flex-row  gap-4 sm:gap-11 justify-center items-center px-4">
              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                value={enquiryInfo.name}
                autoFocus
                className="w-full sm:w-1/3 py-2.5 px-4  border dark:bg-gray-800 dark:text border-blue-400 focus:outline-none rounded"
                required
              />
              <input
                type="text"
                placeholder="Enter mobile number"
                name="phone"
                onChange={handleChange}
                value={enquiryInfo.phone}
                className="w-full sm:w-1/2 py-2.5 px-4 border dark:bg-gray-800 dark:text border-blue-400 focus:outline-none rounded"
                required
              />
            </div>

            
            <div className="flex justify-center items-center mt-4 px-4">
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                value={enquiryInfo.email}
                required
                className="w-full max-w-3xl py-2.5 px-4 dark:bg-gray-800 dark:text border border-blue-400 focus:outline-none rounded"
              />
            </div>

            
            <div className="flex justify-center items-center mt-4 px-4">
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full max-w-3xl py-2.5 px-4 border dark:bg-gray-800 dark:text border-blue-400 focus:outline-none rounded resize-none"
                required
                name="message"
                onChange={handleChange}
                value={enquiryInfo.message}
              ></textarea>
            </div>

           
            <div className="flex justify-center items-center mt-6 mb-10 px-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full max-w-3xl bg-[#3a76cb] text-white py-3 font-bold text-xl rounded hover:bg-orange-400 transition-colors shadow-2xl"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin border-white"></div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Enquiry;
