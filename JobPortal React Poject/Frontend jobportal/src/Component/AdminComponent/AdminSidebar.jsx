import React from "react";
import { FaTachometerAlt, FaUsers } from "react-icons/fa";
import { BsLayersFill } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";

export const AdminSidebar = () => {
  return (
    <div className="fixed top-0 left-0 bg-[#1E0342] text-white shadow-xl z-[999] w-[10rem] max-w-[10rem] overflow-hidden h-screen">
      <FaRegUserCircle size={50} color="white" className="ml-12 mt-6" />
      <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
        <h1 className="text-white text-[20px] leading-[24px] font-extrabold cursor-pointer">
          Admin Panel
        </h1>
      </div>

      <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] px-2">
        <a href="/admin/dashboard" className="flex items-center gap-[10px]">
          <FaTachometerAlt color="white" />
          <button className="text-[15px] leading-[20px] font-bold text-white">
            Dashboard
          </button>
        </a>
      </div>

      <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] px-2">
        <a href="/admin/userview" className="flex items-center gap-[10px]">
          <FaUsers color="white" />
          <button className="text-white font-normal">Users</button>
        </a>
      </div>

      <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] px-2">
        <a href="/admin/jobcategory" className="flex items-center gap-[10px]">
          <BsLayersFill color="white" />
          <button className="text-white font-normal">Category</button>
        </a>
      </div>

      <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] px-2">
        <a href="/admin/approvedjobs" className="flex items-center gap-[10px]">
          <IoBagCheck color="white" />
          <button className="text-white font-normal">Approved Jobs</button>
        </a>
      </div>

      <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] px-2">
        <a href="/admin/feedbacks" className="flex items-center gap-[10px]">
          <MdFeedback color="white" />
          <button className="text-white font-normal">Feedbacks</button>
        </a>
      </div>

      <div className="flex items-center gap-[15px] py-[20px] px-2">
        <a href="/admin/reports" className="flex items-center gap-[10px]">
          <TbReportSearch color="white" />
          <button className="text-white font-normal">Reports</button>
        </a>
      </div>
      <div className="absolute bottom-0 left-0 w-full px-5 pb-10">
        <a href="/admin/logout" className="flex items-center gap-[15px]">
          <LuLogOut color="white" />
          <button className="text-white font-normal">LogOut</button>
        </a>
      </div>
    </div>
  );
};
