import React, { useState, useEffect } from 'react';
import EmpHeader from '../Component/EmpComponent/EmpHeader';
import { FaDownload } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";

const Applications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications(); // Fetch applications data when the component mounts
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await fetch('http://localhost:8070/applications');
            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleView = (application) => {
        if (application.application) {
            const fileUrl = application.application;
            const mimeType = application.mimeType;

            // Check MIME type to handle preview accordingly
            if (mimeType.startsWith('image/')) {
                // For images, open in a new tab
                window.open(fileUrl, '_blank');
            } else if (mimeType === 'application/pdf') {
                // For PDFs, open in a new tab
                window.open(fileUrl, '_blank');
            } else {
                // For other types, attempt to open in a new tab
                window.open(fileUrl, '_blank');
            }
        } else {
            console.error('Application file not found');
            alert('Application file not found');
        }
    };

    const handleDownload = (application) => {
        if (application.application) {
            const link = document.createElement('a');
            link.href = application.application;
            link.download = application.application.split('/').pop(); // Extract the file name from the URL
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('Application file not found');
            alert('Application file not found');
        }
    };

    return (
        <div>
            <EmpHeader />
            <div className="container mx-auto xl:px-30 px-4 bg-[#F8F9FC] mt-20 h-full w-full pb-10">
                <div className="py-[px] px-[100px]">
                    <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold">
                        Applications
                    </h1>
                    <div className="-mt-20">
                        <section>
                            <div className="mt-[130px] relative mx-1">
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-black dark:text-white items-center m-auto border-2 shadow-3xl border-gray-300 rounded-xl">
                                        <thead className="text-xs uppercase bg-[#2c42a5] dark:bg-gray-900 text-white">
                                            <tr>
                                                <th scope="col" className="p-5 text-center"></th>
                                                <th scope="col" className="px-6 py-1 text-center">
                                                    Company Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    Job Title
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    Job Location
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    E-mail
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    Application
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-center">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.map((application, index) => (
                                                <tr
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                    key={index}
                                                >
                                                    <td className="p-4 text-center">{index + 1}</td>
                                                    <td className="px-6 py-4 text-center">{application.companyName}</td>
                                                    <td className="px-6 py-4 text-center">{application.jobTitle}</td>
                                                    <td className="px-6 py-4 text-center">{application.jobLocation}</td>
                                                    <td className="px-6 py-4 text-center">{application.postingDate}</td>
                                                    <td className="px-6 py-4 text-center">{application.email}</td>
                                                    <td className="px-6 py-4 text-center">{application.application}</td>

                                                    <td className="px-6 py-4 text-center flex justify-center">
                                                        <button
                                                            className="bg-green-500 hover:bg-yellow-600 text-gray-200 font-bold px-1 py-1 rounded mt-3"
                                                            onClick={() => handleView(application)}
                                                        >
                                                            View
                                                            <GrView />
                                                        </button>
                                                        <button
                                                            className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3"
                                                        >
                                                            Delete
                                                            <FaTrash />
                                                        </button>
                                                        <button
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3 flex items-center"
                                                            onClick={() => handleDownload(application)}
                                                        >
                                                            Download
                                                            <FaDownload className="ml-1" />
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
        </div>
    );
}

export default Applications;
