import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handlerError, handlerSuccess } from "../../utils";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const API_URL = import.meta.env.VITE_API_URL;


export default function LoginSignup() {
  const [form, setForm] = useState("login");
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const url =
        form === "login"
          ? `${API_URL}/api/auth/login`
          : `${API_URL}/api/auth/signup`;

      let formToSend;

      if (form === "signup") {
        formToSend = new FormData();

        for (const key in data) {
          formToSend.append(key, data[key]);
        }

        formToSend.append("photo", photo);
      } else {
        formToSend = data;
      }

      const res = await axios.post(url, formToSend, {
        headers:
          form === "signup"
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" },
      });

      handlerSuccess(res.data.message || " Login Success");

      if (form === "signup") {
        handlerSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          setForm("login"); // switch to login form
        }, 1500);
      } else if (form === "login" && res.data.token) {
        localStorage.setItem("token", res.data.token);

        if (res.data.role === "admin") {
          setTimeout(() => {
            window.location.href = "/admin";
          }, 1200);
        } else if (res.data.role === "worker") {
          setTimeout(() => {
            window.location.href = "/worker-dashboard";
          }, 1200);
        } else {
          setTimeout(() => {
            window.location.href = "/unauthorized";
          }, 1200);
        }
      }
    } catch (err) {
      const { response } = err;

      if (response?.data?.errors) {
        handlerError(response.data.errors.join("\n"));
      } else if (response?.data?.message) {
        handlerError(response?.data?.message);
      } else {
        handlerError(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-[#343a46] dark:text-white bg-gray-100 flex justify-center items-center p-4">
      <ToastContainer />
      <div className="bg-white p-6 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {form === "login" ? "Login" : "Sign Up"} - Jepair Bazaar
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {form === "signup" && (
            <>
              <input
                type="text"
                required
                placeholder="Name"
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full border p-2 rounded focus:outline-none border-blue-400  dark:bg-gray-800 dark:text-white"
              />
              <div className="w-full border p-2 rounded border-blue-400">
                <label className="  font-semibold dark:bg-gray-800 dark:text-white">Your Photo </label>
                <span className="text-red-500 text-lg">**</span>
                <input
                  type="file"
                  className=" p-2 file:rounded  file:dark:bg-gray-800 file:hover:cursor-pointer file:dark:text-white dark:text-white "
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  required
                />
              </div>
              <input
                type="text"
                required
                placeholder="Phone "
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="w-full border p-2   dark:bg-gray-800 dark:text-white rounded focus:outline-none border-blue-400"
              />
              <input
                type="text"
                required
                placeholder="Work"
                onChange={(e) => setData({ ...data, work: e.target.value })}
                className="w-full border p-2  dark:bg-gray-800 dark:text-white rounded focus:outline-none border-blue-400"
              />
              <input
                type="text"
                required
                placeholder="Experience"
                onChange={(e) =>
                  setData({ ...data, experience: e.target.value })
                }
                className="w-full border p-2  dark:bg-gray-800 dark:text-white rounded focus:outline-none border-blue-400"
              />
              <input
                type="text"
                required
                placeholder="Location"
                onChange={(e) => setData({ ...data, location: e.target.value })}
                className="w-full border  dark:bg-gray-800 dark:text-white p-2 rounded focus:outline-none border-blue-400"
              />
            </>
          )}
          <input
            type="email"
            required
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="w-full border  dark:bg-gray-800 dark:text-white p-2 rounded focus:outline-none border-blue-400"
          />
          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              required
              placeholder="Password(at least one num,letter & special char)"
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full border  dark:bg-gray-800 dark:text-white p-2 rounded focus:outline-none  border-blue-400 pr-10"
            />
            <div
              className="absolute right-3 top-2.5 cursor-pointer text-blue-500"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white p-2  rounded hover:bg-blue-600 flex justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-white  border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="font-bold text-lg">{form === "login" ? "Login" : "Sign Up"}</span>
            )}
          </button>
        </form>

        <p className="text-center mt-4">
          {form === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() => setForm(form === "login" ? "signup" : "login")}
            className="text-blue-600 underline"
          >
            {form === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
