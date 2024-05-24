import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Switch from '@mui/material/Switch';

const Login = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [remember, setRemember] = useState(false); // State for remember checkbox
  const [role, setRole] = useState("user"); // State for role selection

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate email and password
      if (email === "") {
        toast.error("Email is required");
      } else if (!email.includes("@")) {
        toast.error("Email is invalid");
      } else if (password === "") {
        toast.error("Password is required");
      } else if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
      } else if (!remember) {
        toast.error("Remember me checkbox is required");
      } else {
        const response = await axios.post('http://localhost:8070/registers/login', { email, password, role });
        const data = response.data;

        if (data.status) {
          toast.success("Login Successful");
          switch (role) {
            case 'user':
              window.location.href = '/home';
              break;
            case 'admin':
              window.location.href = '/admin/dashboard';
              break;
            case 'employer':
              window.location.href = '/employer/empdashboard';
              break;
            default:
              window.location.href = '/home';
          }
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login.');
    }
  };

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  useEffect(() => {
    if (email === "admin@gmail.com") {
      setRole("admin");
    }
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 pt-2 mt-12">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-gray-100">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl" data-aos="zoom-in">
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
                    <a href="" className="text-xs">
                      Forget Password?
                    </a>
                  </div>
                  <div className="flex items-center justify-between mb-5 absolute top-0 right-0 mt-3 mr-3  px-2 rounded-full">
                    <span className="text-blue font-bold">Post Job</span>
                    <span className="text-blue font-semibold "></span>
                    <Switch
                      checked={role === "employer"}
                      onChange={() => setRole(role === "employer" ? "user" : "employer")}
                    />
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
