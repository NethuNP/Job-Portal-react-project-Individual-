import React, { useState, useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import Switch from '@mui/material/Switch';
import { FaRegUserCircle } from "react-icons/fa";
import Dropdown from './Dropdown';
import { AuthContext } from "../Component/context/AuthContext";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const handleMenuToggler = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        // Check if the toast message has been displayed
        const toastDisplayed = localStorage.getItem("toastDisplayed");

        if (user && !toastDisplayed) {
            // Display welcome message when user logs in
            toast.success(`Welcome ${user.firstName}`);
            // Set flag to indicate that the toast message has been displayed
            localStorage.setItem("toastDisplayed", true);
        }
    }, [user]);

    const navItems = [
        { path: "/home", title: "Home" },
        { path: "/jobs", title: "Jobs" },
        { path: "/aboutus", title: "About Us" },
        { path: "/contactus", title: "Contact Us" },
    ];

    // Conditionally add the "My Jobs" item if user is logged in
    if (user) {
        navItems.splice(2, 0, { path: "/myjobs", title: "My Jobs" });
    }

    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-white fixed top-0 z-50'>
            <nav className='flex justify-between items-center py-0 bg-white'>
                <a href="/" className='flex items-center gap-3 text-2xl text-blue'>
                    <img src="./images/JOBNEST__1_-removebg-preview (1).png" className='w-[160px] h-[80px] mt-1' alt="Jobnest Logo"></img>
                </a>
                <ul className='hidden md:flex gap-12 font-bold text-blue hover:text-[#4F81C7]'>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className='text-base text-primary'>
                            <NavLink
                                to={path}
                                className="nav-link hover:bg-blue hover:text-white px-4 py-2 rounded-full"
                                activeClassName="active"
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Signup and login */}
                {user ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-[#6f8ebd]">Welcome, {user.firstName}</span>
                        <Dropdown />
                    </div>
                ) : (
                    <div className="text base text-primary font-medium space-x-5 hidden lg:block">
                        <NavLink to="/login" className="py-2 px-5 bg-blue text-white border-2 border-blue rounded font-bold hover:text-blue hover:bg-white">
                            Log in
                        </NavLink>
                    </div>
                )}

                <div className='md:hidden block'>
                    <button onClick={handleMenuToggler}>
                        {isMenuOpen ? <FaXmark className='w-5 h-5 text-primary' /> : <FaBarsStaggered className='w-5 h-5 text-primary' />}
                    </button>
                </div>
            </nav>
            <div className={`px-4 bg-white py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className='text-base text-black first:text-white py-1'>
                            <NavLink
                                to={path}
                                className="nav-link hover:bg-blue hover:text-white px-4 py-2 rounded"
                                activeClassName="active"
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
