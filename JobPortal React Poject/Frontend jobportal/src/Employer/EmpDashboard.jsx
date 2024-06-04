import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaRegBell, FaSearch, FaRegUserCircle, FaUsers } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineEventNote, MdOutlinePendingActions } from "react-icons/md";
import { IoBagHandle } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import Charts from './Charts';

const EmpDashboard = () => {
  const [totalApplications, setTotalApplications] = useState(0);
  const [pendingApplications, setPendingApplications] = useState(0);

  useEffect(() => {
    fetchTotalApplications();
    fetchPendingApplications(); // Call the function to fetch pending applications
  }, []);

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

  const fetchPendingApplications = async () => {
    try {
      const response = await fetch("http://localhost:8070/applications/pending/total");
      if (!response.ok) {
        throw new Error("Failed to fetch pending applications count");
      }
      const data = await response.json();
      setPendingApplications(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      {/* Header */}
      <div className='flex items-center justify-between shadow-3xl h-[70px] px-[25px]'>
        <div className='flex items-center rounded-[5px]'>
          <input
            type='text'
            className='bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder-[14px] leading-[20px] font-normal'
            placeholder='Search here...'
          />
          <div className='bg-blue h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-[5px] rounded-br-[5px]'>
            <FaSearch color='white' />
          </div>
        </div>
        <div className='flex items-center gap-[15px] relative'>
          <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
            <FaRegBell className='text-blue' />
            <FaEnvelope className='text-blue' />
            <FaRegUserCircle className='text-blue'/>
          </div>
        </div>
      </div>

      {/* Body */}
      <div>
        <div className='pt-[25px] px-[25px] bg-[#F8F9FC]'>
          <div className='flex items-center justify-between'>
            <h1 className='text-[#2E59D9] text-[28px] leading-[34px] font-normal cursor-pointer'>Dashboard</h1>
          </div>

          {/* User Info */}
          <div>
            <h1 className='text-[#7c7c7c] font-bold pt-5 text-[22px]'>User Info</h1>
            <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>
              <div className='h-[120px] rounded-[8px] bg- border-2 border-[#0080FF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#0080FF]'>
                <div>
                  <h2 className='text-white text-[15px] leading-[17px] font-bold '>Applications</h2>
                  <h1 className='text-[20px] leading-[24px] font-bold mt-[5px] text-white'>{totalApplications}</h1>
                </div>
                <MdOutlineEventNote fontSize={28} color="white"/>
              </div>

              <div className='h-[120px] rounded-[8px]  border-2 border-[#FF0000] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out overflow-hidden bg-[#FF0000]'>
                <div>
                  <h2 className='text-white text-[15px] leading-[17px] font-bold '>Interviews</h2>
                  <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>1</h1>
                </div>
                <FaUsers fontSize={28} color="white"/>
              </div>

              <div className='h-[120px] rounded-[8px]  border-2 border-[#8000FF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#8000FF] '>
                <div>
                  <h2 className='text-white text-[15px] leading-[17px] font-bold '>Pending</h2>
                  <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>{pendingApplications}</h1>
                </div>
                <MdOutlinePendingActions fontSize={28} color="white"/>
              </div>

              <div className='h-[120px] rounded-[8px]  border-2 border-[#008000] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#008000]'>
                <div>
                  <h2 className='text-white text-[15px] leading-[17px] font-bold '>Declined</h2>
                  <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>15</h1>
                </div>
                <TiCancel fontSize={28} color="white"/>
              </div>
              
            </div>

            
            
          </div>

          
        <div className='bg-[#F8F9FC] flex items-center justify-between  border-b-[1px] border-white mt-1'>
            <h2 className='text-gray-500 text-2xl font-semibold '></h2>
        </div>
        
          <Charts/>
        
            
    

    
          <div>
            
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
    
  );
};

export default EmpDashboard;