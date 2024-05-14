import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import AdminHeader from '../Component/AdminComponent/AdminHeader';
import { MdFileDownloadDone } from "react-icons/md";


export default function JobCategory() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        function getJobs() {
            axios.get("http://localhost:8070/jobs/")
                .then((res) => {
                     // Sort jobs array by postingDate in descending order before setting state
          const sortedJobs = res.data.sort((a, b) => {
            const dateA = new Date(a.postingDate);
            const dateB = new Date(b.postingDate);
            return dateB - dateA;
          });
          setJobs(sortedJobs);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getJobs();
  }, []);

  const DeleteJob1 = (id, companyName) => {
    if (window.confirm(`Are you sure you want to delete ${companyName}?`)) {
        axios
            .delete(`http://localhost:8070/jobs/delete/${id}`)
            .then(() => {
                // Filter out the deleted job from the state
                setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
                alert("Job deleted successfully!");
            })
            .catch((err) => {
                console.log(err);
                alert("Error deleting job");
            });
    }
};


const approveJob = (id, companyName) => {
    if (window.confirm(`Are you sure you want to approve ${companyName}?`)) {
        axios
            .delete(`http://localhost:8070/jobs/delete/${id}`)
            .then(() => {
                // Filter out the deleted job from the state
                setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
                alert("Job approved successfully!");
            })
            .catch((err) => {
                console.log(err);
                alert("Error approve job");
            });
    };}

    return (
        <div>
          <AdminHeader/>
        <div className='bg-[#F8F9FC] mt-16'>
                
        <div className="py-[25px] px-[60px]  ">
                    <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold  ">
                        All Jobs
                    </h1>
                </div>
                <div className='-mt-20 '>
                    <section className="">
                        <div className="mt-[130px] mx-4 relative">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-3/4 text-sm text-left rtl:text-right text-black dark:text-white items-center m-auto border-2 rounded shadow-3xl border-gray-300">
                                    <thead className="text-xs uppercase bg-[#2c42a5] dark:bg-gray-900 text-white">
                                        <tr>
                                            <th scope="col" className="p-4"></th>
                                            <th scope="col" className="px-6 py-3">
                                                Company Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Job Title
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Job Location
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Posting Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Expiry Date
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobs.map((job, index) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                key={index}
                                            >
                                                <td className="p-6">{index + 1}</td>
                                                <td>{job.companyName}</td>
                                                <td>{job.jobTitle}</td>
                                                <td>{job.jobLocation}</td>
                                                <td>{job.postingDate}</td>
                                                <td>{job.expireryDate}</td>
                                                <td className="flex justify-center ">
                                                    <button className="bg-green-500 hover:bg-yellow-600 text-gray-200 font-bold px-1 py-1 rounded mt-3">
                                                        <GrView onClick={() => PostJob(job._id, job.companyName)}/>
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3" onClick={() => DeleteJob1(job._id, job.companyName)}>
                                                        <FaTrash/>
                                                    </button>
                                                    <button className="bg-yellow-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3" onClick={() => approveJob(job._id, job.companyName)}>
                                                        <MdFileDownloadDone/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
