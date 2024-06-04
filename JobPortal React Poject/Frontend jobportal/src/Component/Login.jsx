import React, { useState, useContext } from "react";
import axios from "axios";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Component/context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        toast.error("Email and password are required.");
        return;
      }

      if (!remember) {
        toast.error("Remember me option is required.");
        return;
      }

      let response;

      try {
        // Attempt login as seeker
        response = await axios.post('http://localhost:8070/registers/login', { email, password });

        if (response.data.success) {
          const { data } = response;
          toast.success(data.message);

          if (data.data.role === "seeker") {
            navigate("/home");
          } else if (data.data.role === "admin") {
            navigate("/admin/dashboard");
          }

          dispatch({ type: "LOGIN_SUCCESS", payload: data.data.seeker });
          setEmail("");
          setPassword("");
          setRemember(false);
          return; // Exit function after successful login
        }
      } catch (error) {
        console.error("Seeker login error:", error);
      }

      try {
        // Attempt login as employer
        response = await axios.post('http://localhost:8070/empsignups/login', { email, password });

        if (response.data.success) {
          const { data } = response;
          toast.success(data.message);

          if (data.data.role === "employer") {
            navigate("/employer/empdashboard");
          }

          dispatch({ type: "LOGIN_SUCCESS", payload: data.data.employer });
          setEmail("");
          setPassword("");
          setRemember(false);
          return; // Exit function after successful login
        }
      } catch (error) {
        console.error("Employer login error:", error);
      }

      // If no successful login occurs, show error message
      toast.error("Login failed. Please check your credentials.");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 pt-2 mt-12">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-gray-100">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5 relative">
            <div className="font-bold text-left">
              <span className="text-blue">JOB</span>NEST
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-blue">Sign in to Account</h2>
              <div className="border-2 w-10 border-white inline-block mb-2 "></div>
              <div className="flex justify-center  my-2">
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:text-blue">
                  <FaFacebookF className="text-sm" />
                </a>
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:text-blue">
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:text-blue">
                  <FaGoogle className="text-sm" />
                </a>
              </div>
              <p className="text-gray-400 my-">or use your email account</p>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center mb-3">
                  <div className="bg-gray-100 w-64 p-2 flex items-center ">
                    <FaRegEnvelope className="text-gray-400 mr-2" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center mb-3">
                  <div className="bg-gray-100 w-64 p-2 flex items-center ">
                    <MdLockOutline className="text-gray-400 mr-2" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm flex-1"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between w-64 mb-5 mt-2">
                    <label className="flex items-center text-xs">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="mr-1"
                      />
                      Remember me
                    </label>
                    <a href="#" onClick={() => setIsModalOpen(true)} className="text-xs">
                      Forget Password?
                    </a>
                  </div>
                  
                  <button
                    type="submit"
                    className="border-2 border-blue-500 text-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue hover:text-white"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Right side content */}
          <div
            className="w-2/5  rounded-tr-2xl rounded-br-2xl py-36 px-12 flex flex-col justify-center items-center"
            style={{ backgroundImage: "url('/images/27053.jpg')" }}
          >
            <h2 className="text-3xl font-bold mb-3 text-white ">WelCome!</h2>
            <div className="border-2 w-10 border-white mb-3"></div>
            <p className="mb-6 text-white text-center">
              Fill up personal information and start journey with us,
            </p>
            <a
              href="./signup"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-black text-slate-200 "
            >
              Sign UP
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
