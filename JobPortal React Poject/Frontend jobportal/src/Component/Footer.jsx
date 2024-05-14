import React from 'react';
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
   
    <footer className="rounded-lg shadow dark:bg-gray-900 m-0 bg-[#6896cf] w-full">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center justify-center mb-4 sm:mb-0 space-x-0 rtl:space-x-reverse">
            <img src="./public/images/JOBNEST__1_-removebg-preview (1).png" className="h-16" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"><span className='text-gray-200'>JOB</span>NEST</span>
          </div>
          <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-black sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/home" className="hover:underline me-4 md:me-6">Home</a>
            </li>
            <li>
              <a href="/jobs" className="hover:underline me-4 md:me-6">Jobs</a>
            </li>
            <li>
              <a href="/aboutus" className="hover:underline me-4 md:me-6">About Us</a>
            </li>
            <li>
              <a href="contactus" className="hover:underline">Contact Us</a>
            </li>
          </ul>
          <div className="flex justify-end items-end">
            <div className="flex items-end">
              <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:text-blue">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:text-blue">
                <FaLinkedinIn className="text-sm" />
              </a>
              <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1 hover:text-blue">
                <FaInstagram  className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </footer>
    
  );
};

export default Footer;
