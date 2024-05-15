import React, { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggler = () => {
        setMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { path: "/home", title: "Home" },
        { path: "/jobs", title: "Jobs" },
        { path: "/aboutus", title: "About Us" },
        { path: "/contactus", title: "Contact Us" },
    ];

    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-white fixed top-0 z-50'>
            <nav className='flex justify-between items-center py-0 bg-white'>
                <a href="/" className='flex items-center gap-3 text-2xl text-blue'>
                    <img src="./public/images/JOBNEST__1_-removebg-preview (1).png" className='w-[160px] h-[80px] mt-1' alt="Jobnest Logo"></img>
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
                <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
                    <Link to="/login" className='py-2 px-5 border rounded text-blue hover:bg-blue hover:text-white border-[#4bacd3] '>Login</Link>
                    {/*<Link to="/emplogin" className='py-2 px-5 border rounded bg-[#4F81C7] text-white hover:bg-white hover:text-blue border-[#4bacd3] '>Post Job</Link>*/}
                </div>
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
                    <li className='text-white py-1'><Link to="/login" className='py-2 px-5 rounded'>Login</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
