import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiDollarSign, FiMapPin } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { TbClockX } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";


const Card = ({ data }) => {
  // Destructure data
  const {
    _id,
    companyName,
    companyLogo,
    minPrice,
    maxPrice,
    jobLocation,

    expireryDate,
    employmentType,
    jobTitle
  } = data || {}; // Ensure data object exists

 
  return (
    <motion.div
      className='card'
      
      whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: 'easeOut' } }} // Scale up smoothly on hover
      whileTap={{ scale: 0.95 }} // Scale down on tap
    >
      <Link to={`/jobs/${_id}`} className='flex gap-4 flex-col sm:flex-row items-start m-5 border-solid bg-slate-100 cursor-pointer drop-shadow-xl hover:bg-slate-300'>
        <motion.img
          src={companyLogo}
          alt=""
          className=' flex gap-4 mt-3 ml-3 h-16 w-16 ' // Ensure companyLogo is a valid URL or path
          initial={{ opacity: 0 }} // Initial opacity
          animate={{ opacity: 1, transition: { duration: 0.5 } }} // Fade in animation
        />
        <div className="flex-grow" />
        <div className='flex justify-between'></div>
        <div>
          <h4 className='text-primary mb-1'>{companyName}</h4>
          <h3 className='text-lg font-semibold mb-2'>{jobTitle}</h3>
          <div className='text-primary/70 text-base flex flex-wrap gap-10 mb-2'>

            <span className='flex items-center gap-2'><FaLocationDot /> {jobLocation}</span>
            <span className='flex items-center gap-2 '> <FiDollarSign className='text-black font-bold'/>LKR {minPrice} - {maxPrice}</span>
            <span className='flex items-center gap-2' ><FaUserTie/>{employmentType}</span>
            <span className='flex items-center gap-2 '><TbClockX /> {expireryDate} </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default Card;
