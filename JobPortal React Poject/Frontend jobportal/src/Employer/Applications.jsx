import React, { useState, useEffect, useRef } from "react";
import { FaDownload, FaTrash, FaUsers } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const itemsPerPage = 4;
  const pdfRef = useRef(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("http://localhost:8070/applications/");
      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applications");
    }
  };

  const handleInterview = async (applicationId) => {
    try {
      const response = await fetch(
        `http://localhost:8070/applications/interview/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update application status to Interviewed");
      }
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId
            ? { ...application, status: "Interviewed" }
            : application
        )
      );
      toast.success("Application status updated to Interviewed");
    } catch (error) {
      console.error("Error updating application status:", error);
     // toast.error("Failed to update application status to Interviewed");
    }
  };

  const handleView = (application) => {
    if (application.application) {
      const fileUrl = `http://localhost:8070/applications/download/${application.application}`;
      window.open(fileUrl, "_blank");
    } else {
      toast.error("Application file not found");
    }
  };

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a3");
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("applications.pdf");
    });
  };

  const handleApprove = async (applicationId) => {
    try {
      const response = await fetch(
        `http://localhost:8070/applications/approve/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to approve application");
      }
      const result = await response.json();
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId
            ? { ...application, status: "Approved" }
            : application
        )
      );
      toast.success(result.message);
    } catch (error) {
      console.error("Error approving application:", error);
      toast.error(error.message);
    }
  };

  const handleDecline = async (applicationId) => {
    try {
      const response = await fetch(
        `http://localhost:8070/applications/decline/${applicationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to decline application");
      }
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId
            ? { ...application, status: "Declined" }
            : application
        )
      );
      toast.success("Application declined successfully");
    } catch (error) {
      console.error("Error declining application:", error);
      toast.error("Failed to decline application");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredApplications =
    selectedStatus === "All"
      ? applications
      : applications.filter((application) => application.status === selectedStatus);
  const currentApplications = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredApplications.length / itemsPerPage)) {
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
      <ToastContainer />
      <div className="container mx-auto xl:px-30 px-4 bg-white mt-20 h-full w-full pb-10">
        <div className="py-4">
          <h1 className="text-blue text-2xl font-semibold text-center">
            Applications
          </h1>
          <div className="mt-10">
            <section>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-black border-2 shadow-xl border-gray-300 rounded-xl">
                  <thead className="text-xs uppercase bg-[#2c42a5] text-white">
                    <tr>
                      <th scope="col" className="p-5 text-center">No</th>
                      <th scope="col" className="px-6 py-1 text-center">Company Name</th>
                      <th scope="col" className="px-6 py-3 text-center">Job Title</th>
                      <th scope="col" className="px-6 py-3 text-center">Job Location</th>
                      <th scope="col" className="px-6 py-3 text-center">Date</th>
                      <th scope="col" className="px-6 py-3 text-center">E-mail</th>
                      <th scope="col" className="px-6 py-3 text-center">Status</th>
                      <th scope="col" className="px-6 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentApplications.map((application, index) => (
                      <tr
                        className="bg-white border-b hover:bg-gray-50"
                        key={index}
                      >
                        <td className="p-4 text-center">{indexOfFirstItem + index + 1}</td>
                        <td className="px-6 py-4 text-center">{application.companyName}</td>
                        <td className="px-6 py-4 text-center">{application.jobTitle}</td>
                        <td className="px-6 py-4 text-center">{application.jobLocation}</td>
                        <td className="px-6 py-4 text-center">{application.postingDate}</td>
                        <td className="px-6 py-4 text-center">{application.email}</td>
                        <td className="px-6 py-4 text-center">{application.status}</td>
                        <td className="px-6 py-4 text-center flex justify-center space-x-2">
                          <button
                            className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded"
                            onClick={() => handleDecline(application._id)}
                          >
                            <TiCancel />
                          </button>
                          <button
                            className="bg-blue hover:bg-yellow-600 text-gray-200 font-bold px-1 py-1 rounded"
                            onClick={() => handleView(application)}
                          >
                            <FaDownload />
                          </button>
                          <button
                            className="bg-yellow-600 hover:bg-yellow-700 text-gray-200 font-bold px-1 py-1 rounded"
                            onClick={() => handleApprove(application._id)}
                          >
                            <MdFileDownloadDone />
                          </button>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-8 text-blue">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="hover:underline"
          >
            Previous
          </button>
          <span className="mx-2 text-black">
            Page {currentPage} of {Math.ceil(filteredApplications.length / itemsPerPage)}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === Math.ceil(filteredApplications.length / itemsPerPage)}
            className="hover:underline"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Applications;
