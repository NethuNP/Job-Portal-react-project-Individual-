import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdFileDownloadDone } from "react-icons/md";
import AdminHeader from '../Component/AdminComponent/AdminHeader';

export default function ApprovedJobs() {
    const [approvedJobs, setApprovedJobs] = useState([]);

    useEffect(() => {
        getApprovedJobs();
    }, []);

    const getApprovedJobs = () => {
        axios.get("http://localhost:8070/approvedjobs")
            .then((res) => {
                setApprovedJobs(res.data);
            })
            .catch((err) => {
                console.error(err);
                alert("Error fetching approved jobs");
            });
    };

    

    return (
        <div>
            <AdminHeader />
            <div className='bg-[#F8F9FC] mt-16'>
                <div className="py-[25px] px-[60px]">
                    <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold">
                        All Jobs
                    </h1>
                </div>
                <div className='-mt-20'>
                    <section>
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
                                        {approvedJobs.map((job, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{job.companyName}</td>
                                                <td>{job.jobTitle}</td>
                                                <td>{job.jobLocation}</td>
                                                <td>{job.postingDate}</td>
                                                <td>{job.expireryDate}</td>
                                                <td className="flex justify-center">
                                                    <button className="bg-green-500 hover:bg-yellow-600 text-gray-200 font-bold px-1 py-1 rounded mt-3">
                                                        <GrView />
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3">
                                                        <FaTrash />
                                                    </button>
                                                    <button className="bg-yellow-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3">
                                                        <MdFileDownloadDone />
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
