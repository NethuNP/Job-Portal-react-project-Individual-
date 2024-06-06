import React, { useState, useEffect } from 'react';
import { FaUsers } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineEventNote } from "react-icons/md";
import AdminHeader from '../Component/AdminComponent/AdminHeader';
import Charts from '../Employer/Charts';

const Dashboard = () => {
  const [totalRegisters, setTotalRegisters] = useState(0);
  const [totalEmpSignups, setTotalEmpSignups] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalApprovedJobs, setTotalApprovedJobs] = useState(0);
  const [totalDeclinedApplications, setTotalDeclinedApplications] = useState(0);
  const [totalPendingApplications, setTotalPendingApplications] = useState(0);

  useEffect(() => {
    fetchTotalRegisters();
    fetchTotalEmpSignups();
    fetchTotalApplications();
    fetchTotalApprovedJobs();
    fetchTotalDeclinedApplications();
    fetchTotalPendingApplications();
  }, []);

  const fetchTotalRegisters = async () => {
    try {
      const response = await fetch("http://localhost:8070/registers/total");
      if (!response.ok) {
        throw new Error("Failed to fetch total registers count");
      }
      const data = await response.json();
      setTotalRegisters(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalEmpSignups = async () => {
    try {
      const response = await fetch("http://localhost:8070/EmpSignups/total");
      if (!response.ok) {
        throw new Error("Failed to fetch total EmpSignups count");
      }
      const data = await response.json();
      setTotalEmpSignups(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalApplications = async () => {
    try {
      const response = await fetch("http://localhost:8070/applications/total");
      if (!response.ok) {
        throw new Error("Failed to fetch total applications count");
      }
      const data = await response.json();
      setTotalApplications(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalApprovedJobs = async () => {
    try {
      const response = await fetch("http://localhost:8070/ApprovedJobs/total");
      if (!response.ok) {
        throw new Error("Failed to fetch total approved jobs count");
      }
      const data = await response.json();
      setTotalApprovedJobs(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalDeclinedApplications = async () => {
    try {
      const response = await fetch("http://localhost:8070/applications/declined/total");
      if (!response.ok) {
        throw new Error("Failed to fetch total declined applications count");
      }
      const data = await response.json();
      setTotalDeclinedApplications(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTotalPendingApplications = async () => {
    try {
      const response = await fetch("http://localhost:8070/applications/pending/total");
      if (!response.ok) {
        throw new Error("Failed to fetch total pending applications count");
      }
      const data = await response.json();
      setTotalPendingApplications(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className='pt-[25px] px-[25px] bg-[#F8F9FC]'>
        <div className='flex items-center justify-between'>
          <h1 className='text-[#2E59D9] text-[28px] leading-[34px] cursor-pointer font-semibold'>Dashboard</h1>
        </div>

        {/* User Info */}
        <div>
          <h1 className='text-[#7c7c7c] font-bold pt-5 text-[22px]'>User Info</h1>
          <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>
            <div className='h-[120px] rounded-[8px] border-2 border-[#0080FF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#0080FF]'>
              <div>
                <h2 className='text-white text-[15px] leading-[17px] font-bold'>Total Members</h2>
                <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>{totalRegisters}</h1>
              </div>
              <FaUsers fontSize={28} color="white" />
            </div>

            <div className='h-[120px] rounded-[8px] border-2 border-[#FF0000] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#FF0000]'>
              <div>
                <h2 className='text-white text-[15px] leading-[17px] font-bold'>Admins</h2>
                <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>1</h1>
              </div>
              <RiAdminLine fontSize={28} color="white" />
            </div>

            <div className='h-[120px] rounded-[8px] border-2 border-[#8000FF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#8000FF]'>
              <div>
                <h2 className='text-white text-[15px] leading-[17px] font-bold'>Recruiters</h2>
                <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>{totalEmpSignups}</h1>
              </div>
              <FaUsers fontSize={28} color="white" />
            </div>

            <div className='h-[120px] rounded-[8px] border-2 border-[#008000] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#008000]'>
              <div>
                <h2 className='text-white text-[15px] leading-[17px] font-bold'>All Applications</h2>
                <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>{totalApplications}</h1>
              </div>
              <MdOutlineEventNote fontSize={28} color="white" />
            </div>
          </div>
        </div>
        <div className='bg-[#F8F9FC] flex items-center justify-between border-b-[1px] border-white mt-1'>
          <h2 className='text-gray-500 text-2xl font-semibold '></h2>
        </div>

        {/* Placeholder for Charts component */}
        <div>
         <Charts/>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
