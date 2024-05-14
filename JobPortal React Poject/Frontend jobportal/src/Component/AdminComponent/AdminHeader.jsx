import React from 'react';
import { FaRegBell, FaEnvelope, FaRegUserCircle, FaSearch } from 'react-icons/fa';

const AdminHeader = () => {
  return (
    <div className='flex items-center justify-between h-[70px] px-[25px] bg-white fixed  top-0 z-50 w-[89%] drop-shadow-md'>
      <div className='flex items-center rounded-[5px]'>
        {/* Content for the left side of the header */}
      </div>
      <div className='flex items-center gap-[15px] relative'>
        <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
          <FaRegBell color='blue'/>
          <FaEnvelope color='blue'/>
          <FaRegUserCircle color='blue'/> 
        </div>
        <div>
          {/* Content for the right side of the header */}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
