import React from 'react';
import AdminDropdown from '../../Admin/AdminDropdown';

const AdminHeader = () => {
  return (
    <div className='flex items-center justify-between h-[70px] px-[25px] bg-white fixed top-0 z-50 w-[89%] drop-shadow-md'>
      <div className='flex items-center rounded-[5px]'>
        <a href="/" className='flex items-center gap-3 text-2xl text-blue'>
          <img
            src="/images/JOBNEST__1_-removebg-preview (1).png"
            className='w-[160px] h-[80px] mt-1'
            alt="Jobnest Logo"
          />
        </a>
      </div>
      
        <div>
        <div className='flex items-center gap-[15px] relative'>
        <AdminDropdown/>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
