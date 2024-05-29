import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Component/context/AuthContext';
import { FaUserTie } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

const MyJobs = () => {
  const { seeker } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch jobs applied by logged-in seeker's email
    const fetchJobs = async () => {
      if (!seeker || !seeker.email) return; // Exit early if seeker or email is not set

      try {
        const response = await axios.get('http://localhost:8070/jobs', {
          params: {
            email: seeker.email,
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('There was an error fetching the jobs.');
      }
    };

    fetchJobs();
  }, [seeker]);

  return (
    <div className="myjobs mt-28 bg-[#b8ccf1] grid md:grid-cols-2 gap-5 lg:px-24 px-4 py-12 h-[300px] mb-10 rounded-3xl shadow-3xl">
      <div className="left-column bg-gray-100 w-80 pl-7 pt-10 rounded-2xl shadow-3xl">
        {seeker && (
          <div className="flex items-center gap-3 font-semibold">
            <FaUserTie className="inline" /> :
            <p>{seeker.firstName} {seeker.lastName}</p>
          </div>
        )}
        {seeker && (
          <div className="flex items-center gap-3 font-semibold space-between">
            <MdOutlineMailOutline className="inline" /> :
            <p>{seeker.email}</p>
          </div>
        )}
        {error && (
          <p className="error">{error}</p>
        )}
      </div>
      <div className="right-column">
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="mb-5">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
              {/* Add more details as needed */}
            </li>
          ))}
          {jobs.length === 0 && !error && (
            <p>No jobs found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyJobs;
