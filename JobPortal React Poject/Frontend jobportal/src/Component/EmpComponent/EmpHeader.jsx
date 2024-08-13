import React, { useContext } from "react";
import { FaRegBell } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import EmpDropdown from "../../Employer/EmpDropdown";

const EmpHeader = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between h-[70px] px-[16px] bg-white fixed top-0 z-50 w-[89%] drop-shadow-md">
      <div className="flex items-center rounded-[5px]">
        <a href="/" className="flex items-center gap-3 text-2xl text-blue">
          <img
            src="/images/JOBNEST__1_-removebg-preview (1).png"
            className="w-[160px] h-[80px] mt-1"
            alt="Jobnest Logo"
          />
        </a>
      </div>

      <div className="flex items-center gap-[15px] relative">
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-[#6f8ebd]">Welcome, {user.firstName}</span>
            <EmpDropdown />
            <button
              type="button"
              className="flex text-sm bg-blue-950 rounded-full md:me-0  ml-3"
              aria-label="Notifications"
            >
              <FaRegBell className=" mr-5" size={25} color="blue" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span className="text-[#6f8ebd]"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpHeader;
