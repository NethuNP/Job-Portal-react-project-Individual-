import React, { useState, useEffect } from "react";
import axios from "axios"; // Add this import statement
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";
import Chatbot from "../Component/chatbot";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const sendData = async (e) => {
    e.preventDefault();

    const newFeedback = {
      name,
      email,
      message,
    };

    try {
      await axios.post("http://localhost:8070/fedbacks/add", newFeedback);
      alert("Feedback Added");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error adding feedback:", err);
      setError("There was an error adding the feedback.");
    }
  };

  return (
    <div className="bg-gray-100 antialiased pt-5 mt-20 min-h-screen">
      <div className="flex w-full min-h-[60vh] justify-center items-center">
        <div
          className="flex flex-col md:flex-row md:space-x-56 space-y-6 md:space-y-0 w-full max-w-4xl p-8 sm:p-10 rounded-xl shadow-lg text-white overflow-hidden mb-5"
          data-aos="zoom-in"
          style={{ backgroundImage: "url('/images/27053.jpg')" }}
        >
          <div className="flex flex-col space-y-8 justify-between">
            <div>
              <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
              <p className="pt-2 text-cyan-100 text-sm">
                Ask us for any complaint or problem
              </p>
            </div>
            <div className="flex flex-col space-y-6">
              <div className="inline-flex space-x-2 items-center">
                <BsFillTelephoneFill className="text-xl" />
                <span>+(947) 76542310</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
                <IoMdMail className="text-xl" />
                <span>jobnestlanka@gmail.com</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
                <FaLocationDot className="text-xl" />
                <span>Sri Lanka</span>
              </div>
            </div>
            <div className="flex space-x-4 text-lg">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <BsTwitterX />
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className="rounded-xl shadow-2xl p-8 text-white md:w-80 bg-white rounded-tl-[35px] rounded-br-[35px]">
            <form onSubmit={sendData} className="flex flex-col space-y-4">
              <div>
                <label htmlFor="name" className="text-sm text-blue font-bold">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ring-1 ring-gray-300 w-full rounded px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue bg-gray-100 text-black"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-blue font-bold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ring-1 ring-gray-300 w-full rounded px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue bg-gray-100 text-black"
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-blue font-bold">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="ring-1 ring-gray-300 w-full rounded px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-blue bg-gray-100 text-black"
                />
              </div>
              <button
                type="submit"
                className="inline-block self-end bg-blue text-white hover:bg-white hover:text-blue border-2 border-blue font-bold rounded-lg px-6 py-2 uppercase text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
