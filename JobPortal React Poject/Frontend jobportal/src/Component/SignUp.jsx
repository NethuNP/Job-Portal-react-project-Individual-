import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(""); // Corrected the state name

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (firstName === "") {
      toast.error(<div>First Name is required</div>);
    } else if (lastName === "") {
      toast.error(<div>Last Name is required</div>);
    } else if (email === "") {
      toast.error(<div>Email is required</div>);
    } else if (!email.includes("@")) {
      toast.error(<div>Email is invalid</div>);
    } else if (password === "") {
      toast.error(<div>Password is required</div>);
    } else if (password.length < 6) {
      toast.error(<div>Password must be at least 6 characters</div>);
    } else if (confirmPassword === "") {
      toast.error(<div>Confirm Password is required</div>);
    } else if (confirmPassword !== password) {
      toast.error(<div>Passwords do not match</div>);
    } else if (checkbox === "") {
      toast.error(<div>Checkbox is required</div>);
    } else {
      toast.success(<div> Succesfull !</div>);
      // Proceed with form submission if all fields are valid
      sendData();
    }
  };

  const sendData = () => {
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };

    axios.post("http://localhost:8070/registers/add", newUser)
      .then(() => {
        toast.success(<div> Registration Successful!</div>);
        navigate("/login");
        // Optionally reset form fields after successful registration
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCheckbox("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(<div> Error registering user</div>);
      });
  };

  return (
    <div className="min-h-screen py-14 bg-gray-100 mt-20 ">
      <div className="container bg-gray-100 mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: "url('./public/images/4153553.jpg')" }}
          ></div>
          <div className="w-full lg:w-1/2 py-16 px-12 bg-slate-200">
            <h2 className="text-3xl mb-4 text-blue justify-center font-semibold">
              Sign-Up
            </h2>
            <p className="mb-4">Create your own account.</p>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-400 rounded py-1 px-2"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-400 rounded py-1 px-2"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="border border-gray-400 rounded py-1 px-2 w-full"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 rounded py-1 px-2 w-full"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="border border-gray-400 rounded py-1 px-2 w-full"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <div className="mt-5">
                  <input
                    type="checkbox"
                    className="border border-gray-400"
                    onChange={(e) => setCheckbox(e.target.checked)}
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
                    className="w-full bg-blue border-2 border-blue text-white py-3 text-center rounded hover:bg-white hover:text-blue"
                  >
                    Submit
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

export default SignUp;
