import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import Switch from '@mui/material/Switch';

const Dropdown = ({ history }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [role, setRole] = useState("user");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSwitch = () => {
    if (role === 'user') {
      setRole('employer');
      window.location.href = '/employer/empdashboard';
    } else {
      setRole('user');
      window.location.href = '/home';
    }
  };

  

  return (
    <div className="flex items-center justify-end -mr-44 relative">
      <button
        type="button"
        className="flex text-sm bg-blue-950 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded={isDropdownOpen ? "true" : "false"}
        aria-controls="user-dropdown"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-12 w-12 rounded-full"
          src="./images/9131529.png"
          alt="user photo"
        />
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-0 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-xl shadow dark:bg-blue-950 dark:divide-gray-60 mt-64 w-44 "
          id="user-dropdown"
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <span className="block text-sm text-gray-900 dark:text-black">
                Nethu
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                nethu@gmail.com
              </span>
            </div>

            <Switch
              checked={role === "employer"}
              onChange={handleSwitch}
            />
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li className="flex items-center">
              <FaRegUser className="mr-2 ml-2" />
              <a
                href="/userprofile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Profile
              </a>
            </li>

            <li className="flex items-center">
              <IoSettingsOutline className="mr-2 ml-2" />
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li className="flex items-center">
              <PiSignOutBold className="mr-2 ml-2" />
              <a
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
