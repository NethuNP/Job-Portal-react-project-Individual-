import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../Component/AdminComponent/AdminHeader';

export default function ApprovedJobs() {
    const [approvedJobs, setApprovedJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
                toast.error("Error fetching approved jobs");
            });
    };

    const deleteJob = (id, companyName) => {
        if (window.confirm(`Are you sure you want to delete ${companyName}?`)) {
            axios
                .delete(`http://localhost:8070/approvedjobs/delete/${id}`)
                .then(() => {
                    // Filter out the deleted job from the state
                    setApprovedJobs(prevJobs => prevJobs.filter(job => job._id !== id));
                    toast.success("Job deleted successfully!");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Error deleting job");
                });
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = approvedJobs.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(approvedJobs.length / itemsPerPage)) {
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
            
            <div className="container mx-auto xl:px-30 px-4 bg-white mt-20 h-full w-full ">
                <div className="py-4 px-10">
                    <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold text-center">
                        Approved Jobs
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
                                                    className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
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
                            Page {currentPage} of {Math.ceil(approvedJobs.length / itemsPerPage)}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === Math.ceil(approvedJobs.length / itemsPerPage)}
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
