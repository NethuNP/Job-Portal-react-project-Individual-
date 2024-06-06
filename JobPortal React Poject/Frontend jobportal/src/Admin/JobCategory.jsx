import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdFileDownloadDone } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../Component/AdminComponent/AdminHeader';

export default function JobCategory() {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = () => {
        axios.get("http://localhost:8070/jobs/")
            .then((res) => {
                const sortedJobs = res.data.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));
                setJobs(sortedJobs);
            })
            .catch((err) => {
                toast.error("Error fetching jobs");
                console.error(err);
            });
    };

    const deleteJob = (id, companyName) => {
        if (window.confirm(`Are you sure you want to delete ${companyName}?`)) {
            axios.delete(`http://localhost:8070/jobs/delete/${id}`)
                .then(() => {
                    setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
                    toast.success("Job deleted successfully!");
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Error deleting job");
                });
        }
    };

    const approveJob = (id, companyName) => {
        if (window.confirm(`Are you sure you want to approve ${companyName}?`)) {
            axios.put(`http://localhost:8070/jobs/approve/${id}`)
                .then(() => {
                    setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
                    toast.success("Job approved successfully!");
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Error approving job");
                });
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(jobs.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <AdminHeader />
            <div className="container mx-auto xl:px-30 px-4 bg-white mt-20 h-full w-full pb-10">
                <div className="py-4 px-10">
                    <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold">
                        Jobs
                    </h1>
                    <div className="mt-10">
                        <section>
                            <div className="relative mx-1 ">
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-black dark:text-white items-center m-auto border-2 shadow-3xl border-gray-300 rounded-xl">
                                        <thead className="text-xs uppercase bg-[#2c42a5] dark:bg-gray-900 text-white">
                                            <tr>
                                                <th scope="col" className="p-5 text-center"></th>
                                                <th scope="col" className="px-6 py-1 text-center">Company Name</th>
                                                <th scope="col" className="px-6 py-3 text-center">Job Title</th>
                                                <th scope="col" className="px-6 py-3 text-center">Job Location</th>
                                                <th scope="col" className="px-6 py-3 text-center">Posting Date</th>
                                                <th scope="col" className="px-6 py-3 text-center">Expiry Date</th>
                                                <th scope="col" className="px-6 py-3 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentJobs.map((job, index) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                    key={index}
                                                >
                                                    <td className="p-4 text-center">{indexOfFirstItem + index + 1}</td>
                                                    <td className="px-6 py-4 text-center">{job.companyName}</td>
                                                    <td className="px-6 py-4 text-center">{job.jobTitle}</td>
                                                    <td className="px-6 py-4 text-center">{job.jobLocation}</td>
                                                    <td className="px-6 py-4 text-center">{job.postingDate}</td>
                                                    <td className="px-6 py-4 text-center">{job.expireryDate}</td>
                                                    <td className="px-6 py-4 text-center flex justify-center">
                                                       
                                                        <button className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3" onClick={() => deleteJob(job._id, job.companyName)}>
                                                            <FaTrash />
                                                        </button>
                                                        <button className="bg-yellow-500 hover:bg-blue-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3" onClick={() => approveJob(job._id, job.companyName)}>
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
                    {/* Pagination */}
                    <div className="flex justify-center mt-4 space-x-8 text-[#2c42a5]">
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
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
