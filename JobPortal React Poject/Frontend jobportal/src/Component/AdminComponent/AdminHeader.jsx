import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDropdown from '../../Admin/AdminDropdown';

const AdminHeader = () => {
  const { seeker } = useContext(AuthContext);

  return (
    <div className='flex items-center justify-between h-[70px] px-[16px] bg-white fixed top-0 z-50 w-[89%] drop-shadow-md'>
      <div className='flex items-center rounded-[5px]'>
        <a href="/" className='flex items-center gap-3 text-2xl text-blue'>
          <img
            src="/images/JOBNEST__1_-removebg-preview (1).png"
            className='w-[160px] h-[80px] mt-1'
            alt="Jobnest Logo"
          />
        </a>
      </div>

      <div className='flex items-center gap-[15px] relative'>
        {/* Conditional rendering based on the presence of the seeker object */}
        {seeker ? (
          <div className="flex items-center space-x-4">
            <span className="text-[#6f8ebd]">Welcome, {seeker.firstName}</span>
            <AdminDropdown />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {/* You can add a login/signup link or component here */}
            <span className="text-[#6f8ebd]">Welcome, Guest</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHeader;
