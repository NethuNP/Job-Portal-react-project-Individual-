import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Component/context/AuthContext';
import { FaUserTie } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

const MyJobs = () => {
  const { seeker } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!seeker || !seeker.email) return;

      try {
        const response = await axios.get('http://localhost:8070/applications/', {
          params: {
            email: seeker.email,
          },
        });
        setJobs(response.data);
        setError(null); // Reset error state on success
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('There was an error fetching the jobs. Please try again later.');
        setJobs([]); // Reset jobs state to empty array on error
      }
    };

    fetchJobs();
  }, [seeker]);

  return (
    <div className="myjobs mt-28 bg-[#b8ccf1] grid md:grid-cols-2 gap-5 lg:px-24 px-4 py-12 h-auto mb-10 rounded-3xl shadow-3xl">
      <div>
        {seeker && (
          <div className="flex items-center gap-3 font-semibold mb-4">
            <FaUserTie className="inline" />
            <p>{seeker.firstName} {seeker.lastName}</p>
          </div>
        )}
        {seeker && (
          <div className="flex items-center gap-3 font-semibold mb-4">
            <MdOutlineMailOutline className="inline" />
            <p>{seeker.email}</p>
          </div>
        )}
        {error && (
          <p className="error text-red-500">{error}</p>
        )}
      </div>
      <div className="right-column shadow-3xl px-3 py-3 bg-gray-100 rounded-lg">
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="mb-5 p-4 bg-blue-50 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{job.jobTitle}</h3>
              <p className="text-gray-700">Company: {job.companyName}</p>
              <p className="text-gray-700">Location: {job.jobLocation}</p>
              {/* Add more details as needed */}
            </li>
          ))}
          {jobs.length === 0 && !error && (
            <p className='font-semibold text-2xl text-blue'>No jobs found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};


export default MyJobs;
