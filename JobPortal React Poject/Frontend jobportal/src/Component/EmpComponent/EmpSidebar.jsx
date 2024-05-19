import React from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { MdPostAdd, MdManageAccounts } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

export const EmpSidebar = () => {
  return (
    <div className="top-0 left-0 bg-[#1E0342] text-white shadow-xl z-[999] w-[10rem] max-w-[10rem] overflow-hidden h-screen">
      <FaRegUserCircle size={50} color="white" className="ml-12 mt-6" />
      <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
        <h1 className="text-white text-[20px] leading-[24px] font-extrabold cursor-pointer">
          Recruiter
        </h1>
      </div>

      <div className="flex flex-col items-center gap-[15px] pt-[30px]">
        <div className="py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] w-full px-2">
          <a href="/employer/empdashboard" className="flex items-center gap-[10px]">
            <FaTachometerAlt color="white" />
            <button className="text-[15px] leading-[20px] font-bold text-white">
              Dashboard
            </button>
          </a>
        </div>

        <div className="py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] w-full px-2">
          <a href="/employer/postjob" className="flex items-center gap-[10px]">
            <MdPostAdd color="white" />
            <button className="text-white font-normal">Post Job</button>
          </a>
        </div>

        <div className="py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] w-full px-2">
          <a href="/employer/managejob" className="flex items-center gap-[10px]">
            <MdManageAccounts color="white" />
            <button className="text-white font-normal">Manage Job</button>
          </a>
        </div>

        <div className="py-[20px] w-full px-2">
          <a href="/employer/applications" className="flex items-center gap-[10px]">
            <FaRegNewspaper color="white" />
            <button className="text-white font-normal">Applications</button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-5 pb-10">
        <a href="/login" className="flex items-center gap-[10px]">
          <LuLogOut color="white" />
          <button className="text-white font-normal">LogOut</button>
        </a>
      </div>
    </div>
  );
};
