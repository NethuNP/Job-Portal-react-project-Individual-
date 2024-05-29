import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Myjobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  useEffect(() => {
    // Fetch logged-in user's email from your authentication state or context
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get('http://localhost:8070/registers/login'); // Replace with your endpoint to get logged-in user details
        setLoggedInUserEmail(response.data.email); // Assuming the endpoint returns the logged-in user's email
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };

    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    // Fetch jobs applied by logged-in user's email
    const fetchJobs = async () => {
      if (!loggedInUserEmail) return; // Exit early if email is not set

      try {
        const response = await axios.get('http://localhost:8070/myjobs', {
          params: {
            email: loggedInUserEmail,
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [loggedInUserEmail]);

  return (
    <div className="myjobs">
      <h1>Jobs Applied by Logged-in User</h1>
      <p>Logged in as: {loggedInUserEmail}</p>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Myjobs;
