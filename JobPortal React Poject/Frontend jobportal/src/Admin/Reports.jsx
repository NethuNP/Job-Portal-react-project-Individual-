import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../Component/AdminComponent/AdminHeader';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Reports() {
    const [approvedJobs, setApprovedJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const pdfRef = useRef(null); // Define ref for capturing PDF content

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

    const downloadPDF = () => {
        const input = pdfRef.current;

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a4', true);
            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("jobinfo.pdf");
        });
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
            <AdminHeader />
            <div className="container mx-auto xl:px-30 px-4 bg-white mt-20 h-full w-full ">
                <div className="py-4 px-10">
                    <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold text-center">
                        Job Overview
                    </h1>
                    <div>
                        <button className='bg-blue text-white rounded-lg px-3 py-2 mt-10' onClick={() => setShowModal(true)}>Generate Report</button>
                    </div>
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
                                                <th scope="col" className="px-6 py-3 text-center">Posted By</th>
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
                                                    <td className="px-6 py-4 text-center"> {job.postedBy}</td>
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
            {showModal && (
               
                  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100 shadow-3xl">
                    <div className="bg-white p-8 max-w-4xl">
                    <div ref={pdfRef}className='mt-20'>
                        <h1 className="text-lg font-semibold mb-4 ml-10 mt-20">Report Details</h1>
                        <table className="w-full text-sm text-left ml-10 text-black dark:text-white items-center m-auto border-2  border-gray-300 rounded-xl">
                            <thead className="text-xs uppercase bg-gray-400 dark:bg-gray-900 text-white">
                                <tr>
                                    <th scope="col" className="p-5 text-center"></th>
                                    <th scope="col" className="px-6 py-1 text-center">Company Name</th>
                                    <th scope="col" className="px-6 py-3 text-center">Job Title</th>
                                    <th scope="col" className="px-6 py-3 text-center">Job Location</th>
                                    <th scope="col" className="px-6 py-3 text-center">Posting Date</th>
                                    <th scope="col" className="px-6 py-3 text-center">Expiry Date</th>
                                    <th scope="col" className="px-6 py-3 text-center">Posted By</th>
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
                                        <td className="px-15 py-4 text-center">{job.postingDate}</td>
                                        <td className="px-15 py-4 text-center">{job.expireryDate}</td>
                                        <td className="px-6 py-4 text-center"> {job.postedBy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShowModal(false)} className="bg-blue text-white rounded-lg px-3 py-2 mr-4">Cancel</button>
                            <button onClick={downloadPDF} className="bg-green-500 text-white rounded-lg px-3 py-2">Download</button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
