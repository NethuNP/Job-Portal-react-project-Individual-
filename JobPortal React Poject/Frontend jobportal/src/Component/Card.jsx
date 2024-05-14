import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

const Card = ({ data }) => {
  // Destructure data
  const {
    _id,
    companyName,
    companyLogo,
    minPrice,
    maxPrice,
    jobLocation,
    employmentType,
    postingDate,
    expireryDate,
    jobTitle
  } = data || {}; // Ensure data object exists

  return (
    <section className='card'>
      <Link to={`/jobs/${_id}`} className='flex gap-4 flex-col sm:flex-row items-start m-5 border-solid bg-slate-100 cursor-pointer'>
        <img src={companyLogo} alt="" className='h-20 flex gap-5' /> {/* Ensure companyLogo is a valid URL or path */}
        <div className="flex-grow" />
        <div className='flex justify-between'></div>
        <div>
          <h4 className='text-primary mb-1'>{companyName}</h4>
          <h3 className='text-lg font-semibold mb-2'>{jobTitle}</h3>
          <div className='text-primary/70 text-base flex flex-wrap gap-5 mb-2'>
            <span className='flex items-center gap-'><FiMapPin />{jobLocation}</span>
           {/*} <span className='flex items-center gap-2'><FiClock />{employmentType}</span>*/}
            <span className='flex items-center gap-2'><FiDollarSign /> LKR {minPrice}-{maxPrice}</span>
            <span className='flex items-center gap-2'><FiCalendar /> {postingDate} to {expireryDate} </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

export default Card;
