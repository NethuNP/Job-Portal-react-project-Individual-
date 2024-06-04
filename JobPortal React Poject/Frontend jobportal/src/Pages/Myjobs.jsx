import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Component/context/AuthContext';
import { FaUserTie } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { motion } from 'framer-motion';

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user || !user.email) return;

      try {
        const response = await axios.get('http://localhost:8070/applications', {
          params: {
            email: user.email,
          },
        });
        const filteredJobs = response.data.filter(job => job.email === user.email);
        setJobs(filteredJobs);
        setError(null); // Reset error state on success
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('There was an error fetching the jobs. Please try again later.');
        setJobs([]); // Reset jobs state to empty array on error
      }
    };

    fetchJobs();
  }, [user]);

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      startIndex,
      endIndex,
    };
  };

  // Function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(jobs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Get current jobs based on pagination
  const { startIndex, endIndex } = calculatePageRange();
  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <div className="myjobs mt-28 bg-gradient-to-br from-blue-100 to-blue-300 p-12 h-auto mb-10 rounded-3xl shadow-lg bg-slate-200">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          {user && (
            <>
              <div className='text-2xl font-semibold text-blue pb-4'>
                My Details
              </div>
              <div className="flex items-center gap-3 font-semibold mb-4 text-gray-700">
                <FaUserTie className="text-blue-600" />
                <p>{user.firstName} {user.lastName}</p>
              </div>
              <div className="flex items-center gap-3 font-semibold mb-4 text-gray-700">
                <MdOutlineMailOutline className="text-blue-600" />
                <p>{user.email}</p>
              </div>
              
              <div className='h-auto w-[400px] ml-16'>
                <img src='/images/NA_October_10.jpg' alt="Job Vacancy" />
              </div>
              
            </>
            
          )}
          {error && (
            <p className="text-red-500">{error}</p>
          )}
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className='text-blue text-2xl font-semibold pb-4'>
            My Jobs
          </div>
          <ul className="grid gap-6">
            {currentJobs.map((job) => (
              <motion.li
                key={job._id}
                className=" border border-gray-200 p-6 rounded-lg shadow-sm bg-slate-200 hover:bg-slate-300 flex justify-between items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">{job.jobTitle}</h3>
                  <p className="text-gray-700 mb-1"><span className="font-medium">Company Name:</span> {job.companyName}</p>
                  <p className="text-gray-700 mb-1"><span className="font-medium">Location:</span> {job.jobLocation}</p>
                </div>
                <p className="text-gray-700 mb-1 ml-4"><span className=" text-red-600 font-semibold">Status:</span> {job.status}</p>
              </motion.li>
            ))}
           {jobs.length === 0 && !error && (
                <div className='h-auto w-[400px] ml-16'>
                  
                  <img src='/images/3828537.jpg' alt="No Jobs Found" />
                </div>
            )}
          </ul>
          {/* Pagination */}
          {jobs.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8 text-blue">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2 text-black">
                Page {currentPage} of {Math.ceil(jobs.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(jobs.length / itemsPerPage)}
                className="hover:underline"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
