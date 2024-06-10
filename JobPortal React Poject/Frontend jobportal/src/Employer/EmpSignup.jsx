import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";

const EmpSignup = () => {
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (companyName === "") {
      toast.error("Company Name is required");
    } else if (firstName === "") {
      toast.error("First Name is required");
    }
    else if (lastName === "") {
      toast.error("Last Name is required");
    } else if (email === "") {
      toast.error("Email is required");
    } else if (!email.includes("@")) {
      toast.error("Email is invalid");
    } else if (contactno === "") {
      toast.error("Contact No is required");
    }  else if (contactno.length !== 10) {
      toast.error("Contact No must be exactly 10 characters");
    }else if (address === "") {
      toast.error("Address is required");
    } else if (password === "") {
      toast.error("Password is required");
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
    } else if (confirmPassword === "") {
      toast.error("Confirm Password is required");
    } else if (confirmPassword !== password) {
      toast.error("Passwords do not match");
    } else if (!isChecked) {
      toast.error("Checkbox is required");
    } else {
      sendData();
    }
  };
  
  const sendData = () => {
    const newEmp = {
      companyName,
      firstName,
      lastName,
      email,
      contactno,
      address,
      password,
      confirmPassword
    };
  
    axios.post("http://localhost:8070/empsignups/add", newEmp)
      .then(() => {
        toast.success("Company Registration Successful!");
        navigate("/login");
        setCompanyName("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setContactNo("");
        setAddress("");
        setPassword("");
        setConfirmPassword("");
        setIsChecked(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error registering company");
      });
  };
  

  return (
    <div className="min-h-screen py-14 bg-gray-100 mt-20">
      <div className="container bg-gray-100 mx-auto">
        <div className="flex flex-col lg:flex-row-reverse w-10/12 lg:w-8/12 bg-white rounded-2xl mx-auto shadow-2xl overflow-hidden" data-aos="zoom-out">
          <div
            className="w-full lg:w-2/5 flex flex-col items-center justify-center"
            style={{ backgroundImage: "url('/images/27053.jpg')" }}>
            <h2 className="text-3xl font-bold mb-3 text-white">Welcome!</h2>
            <div className="border-2 w-10 border-white mb-3"></div>
            <p className="mb-6 text-white text-center">
              You have already an Account, Log-in here <br /> company
            </p>
            <a
              href="./login"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-black text-slate-200"
            >
              Sign In
            </a>
          </div>
          <div className="w-full lg:w-3/5 py-10 px-12 bg-white">
  <p className="mb-6 text-blue text-2xl font-bold ml-10">Create Your Business Account.</p>
  <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-2 gap-5">
      <input
        type="text"
        placeholder="Company Name"
        className="bg-gray-100 rounded py-1 px-2 w-4/5 ml-10 text-black placeholder:text-gray-400"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
    <div className="mt-5">
    <input
      type="text"
      placeholder="Last Name"
      className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5 ml-10"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
    /></div>
    <div className="mt-5">
      <input
        type="text"
        placeholder="Email"
        className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5 ml-10"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Contact No"
                  className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5 ml-10"
                  value={contactno}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Address"
                  className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5 ml-10"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5 ml-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-gray-100 text-black placeholder:text-gray-400 rounded py-1 px-2 w-4/5 ml-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <div className="mt-5 ml-10">
                  <input
                    type="checkbox"
                    className="border border-gray-400"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <span>
                    I accept the{" "}
                    <a href="#" className="text-blue font-semibold">
                      Terms of use
                    </a>{" "}
                    &{" "}
                    <a href="#" className="text-blue font-semibold">
                      privacy policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="border-2 border-blue-500 text-blue-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue hover:text-white ml-28"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpSignup;
