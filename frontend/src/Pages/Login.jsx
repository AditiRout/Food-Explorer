import React, { useEffect, useState } from "react";
import loginBg from "../assests/login-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Fill all the details!");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://food-explorer-1.onrender.com/api/user/login",
        {
          email,
          password,
        },
        config
      );
      toast.success("Login successful!");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/user/menu");
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    const userInf = !!JSON.parse(localStorage.getItem("userInfo"));

    if (userInf) {
      navigate("/user/menu");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Left side with background image */}
      <div
        className="lg:w-1/2 bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        {/* Optionally, you can add an overlay to the background image for better readability
      <div className="bg-black bg-opacity-50 h-full"></div> */}
      </div>

      {/* Right side with login form */}
      <div className="min-h-screen lg:w-1/2 flex justify-center items-center">
        <div className="sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </button>
              </div>
              <div>
                <button>
                  <Link
                    to="/"
                    className="mt-4 w-full flex justify-center py-2 px-4 text-red-500 transition-colors duration-300 font-bold"
                  >
                    Dont have an account
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
