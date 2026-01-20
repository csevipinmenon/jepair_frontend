import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

// Success Toast
export const handlerSuccess = (msg) => {
  toast.success(
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "8px" } },
      React.createElement(AiOutlineCheckCircle, {
        size: 20,
        color: "white",
      }),
      React.createElement("span", null, msg || "Success!")
    ),
    {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 500,
        padding: "10px 16px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
      },
    }
  );
};

// Error Toast
export const handlerError = (msg) => {
  toast.error(
    React.createElement(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "8px" } },
      React.createElement(AiOutlineCloseCircle, {
        size: 20,
        color: "white",
      }),
      React.createElement("span", null, msg || "Something went wrong!")
    ),
    {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 500,
        padding: "10px 16px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
      },
    }
  );
};





// import { toast } from "react-toastify";
// export const handlerSuccess = (msg) => {
//   toast.success(msg, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
// };

// export const handlerError = (msg) => {
//   toast.error(msg, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   });
// };  good design 