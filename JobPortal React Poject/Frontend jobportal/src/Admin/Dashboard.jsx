import React from 'react';
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineEventNote } from "react-icons/md";
import { IoBagHandle } from "react-icons/io5";
import { MdOutlinePendingActions } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

const Dashboard = () => {
  return (
    <div className=''>
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
              <h2 className='text-white text-[15px] leading-[17px] font-bold '> Total Members</h2>
              <h1 className='text-[20px] leading-[24px] font-bold text-[#] mt-[5px] text-white'>20</h1>
            </div>
            <FaUsers fontSize={28} color="white"/>
          </div>


          <div className='h-[120px] rounded-[8px]  border-2 border-[#FF0000] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out overflow-hidden bg-[#FF0000]'>
            <div>
              <h2 className='text-white text-[15px] leading-[17px] font-bold '> Admins</h2>
              <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>1</h1>
            </div>
            <RiAdminLine fontSize={28} color="white"/>
          </div>



          <div className='h-[120px] rounded-[8px]  border-2 border-[#8000FF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#8000FF] '>
            <div>
              <h2 className='text-white text-[15px] leading-[17px] font-bold '> Recruiters</h2>
              <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>2</h1>
            </div>
            <FaUsers fontSize={28} color="white"/>
          </div>



          <div className='h-[120px] rounded-[8px]  border-2 border-[#008000] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#008000]'>
            <div>
              <h2 className='text-white text-[15px] leading-[17px] font-bold '> Applications</h2>
              <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>15</h1>
            </div>
            <MdOutlineEventNote fontSize={28} color="white"/>
          </div>
        </div>
      </div>
    
       {/*jobs*/}
    <div>
          <h1 className='text-[#7c7c7c] font-bold pt-5 text-[22px]'>Job Info</h1>
          <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>
            <div className='h-[120px] rounded-[8px] bg- border-2 border-[#640D6B] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#640D6B]'>
            <div>
              <h2 className='text-white text-[15px] leading-[17px] font-bold '> Total Jobs</h2>
              <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>20</h1>
            </div>
            <IoBagHandle fontSize={28} color="white"/>
          </div>


          <div className='h-[120px] rounded-[8px]  border-2 border-[#29ADB2] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#29ADB2]'>
            <div>
              <h2 className='text-white text-[15px] leading-[17px] font-bold '> Pending</h2>
              <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>1</h1>
            </div>
            <MdOutlinePendingActions fontSize={28} color="white"/>
          </div>



          <div className='h-[120px] rounded-[8px]  border-2 border-[#5F374B] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#5F374B]'>
            <div>
              <h2 className='text-white text-[15px] leading-[17px] font-bold '> Interview</h2>
              <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>2</h1>
            </div>
            <FaUsers fontSize={28} color="white"/>
          </div>



          <div className='h-[120px] rounded-[8px]  border-2 border-[#10439F] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-3xl transform hover:scale-[103%] transition duration-300 ease-out bg-[#10439F]'>
            <div>
              <h2 className='text-white text-[15px] leading-[17px] font-bold '> Declined</h2>
              <h1 className='text-[20px] leading-[24px] font-bold text-white mt-[5px]'>15</h1>
            </div>
            <TiCancel fontSize={38} color="white"/>
          </div>
        </div>
      </div>
    </div></div></div>
    
    
  
  );
};

export default Dashboard;
