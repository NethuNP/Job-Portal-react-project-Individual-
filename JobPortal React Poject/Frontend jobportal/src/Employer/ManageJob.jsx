import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { AuthContext } from '../Component/context/AuthContext';
import EmpHeader from "../Component/EmpComponent/EmpHeader";


export default function JobCategory() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedJob, setEditedJob] = useState({
    companyName: "",
    jobTitle: "",
    jobLocation: "",
    postingDate: "", // You might want to set this with a default value
    expireryDate: "" // You might want to set this with a default value
  });
  const [showDescription, setShowDescription] = useState(false);
  const [selectedJobDescription, setSelectedJobDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user || !user.email) return;

      try {
        const response = await axios.get('http://localhost:8070/approvedjobs/', {
          params: {
            email: user.email,
          },
        });
        const filteredJobs = response.data.filter(job => job.postedBy === user.email);
        setJobs(filteredJobs);
        setError(null); // Reset error state on success
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('There was an error fetching the jobs. Please try again later.');
        setJobs([]); // Reset jobs state to empty array on error
      }
    };

    fetchJobs();
  }, [user]);

  jobs.sort((a, b) => {
    const dateA = new Date(a.postingDate);
    const dateB = new Date(b.postingDate);
    return dateB - dateA;
  });

  const deleteJob = (id, companyName) => {
    if (window.confirm(`Are you sure you want to delete ${companyName}?`)) {
      axios
        .delete(`http://localhost:8070/jobs/delete/${id}`)
        .then(() => {
          setJobs(jobs.filter((job) => job._id !== id));
        })
        .catch((err) => {
          console.log(err);
          alert("Error deleting job");
        });
    }
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/jobs/update/${editedJob._id}`, editedJob)
      .then(() => {
        setShowEditModal(false);
        axios
          .get("http://localhost:8070/jobs/")
          .then((res) => {
            setJobs(res.data);
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating job");
      });
  };

  const handleEdit = (job) => {
    setEditedJob(job);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditedJob({
      companyName: "",
      jobTitle: "",
      jobLocation: "",
      postingDate: "", 
      expireryDate: "" 
    });
    setShowEditModal(false);
  };

  const handleViewDescription = (description) => {
    setSelectedJobDescription(description);
    setShowDescription(true);
  };

  const handleCloseDescriptionModal = () => {
    setSelectedJobDescription("");
    setShowDescription(false);
  };

  const handleCancelDescriptionModal = () => {
    setSelectedJobDescription("");
    setShowDescription(false);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      
      <div className="container  xl:px-30 px-4 bg-white mt-20 h-full w-full pb-10">
        <div className="py-[px] px-[100px]">
          <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold">
            Jobs
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
                          Posting Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Expiry Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Actions
                        </th>
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
                            <button
                              className="bg-green-500 hover:bg-yellow-600 text-gray-200 font-bold px-1 py-1 rounded mt-3"
                              onClick={() =>
                                handleViewDescription(job.description)
                              }
                            >
                              <GrView />
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3"
                              onClick={() => deleteJob(job._id, job.companyName)}
                            >
                              <FaTrash />
                            </button>
                            <button
                              className="bg-yellow-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3"
                              onClick={() => handleEdit(job)}
                            >
                              <FaEdit />
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
        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-8 text-blue">
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
        {showEditModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-96 mt-16">
              <h2 className="text-lg font-semibold mb-4 bg-[#2c42a5] text-white py-1 px-3 rounded"> Edit Job</h2>   
              <form onSubmit={handleSubmitEdit}>
                <div className="mb-2">
                  <label htmlFor="companyName" className="block">
                    Company Name:{" "}
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={editedJob.companyName}
                    disabled
                    className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="jobTitle" className="block">
                    Job Title:{" "}
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    value={editedJob.jobTitle}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, jobTitle: e.target.value })
                    }
                    className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="jobLocation" className="block">
                    Job Location:
                  </label>
                  <input
                    type="text"
                    id="jobLocation"
                    value={editedJob.jobLocation}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, jobLocation: e.target.value })
                    }
                    className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="postingDate" className="block">
                    Posting Date:
                  </label>
                  <input
                    type="text"
                    id="postingDate"
                    value={editedJob.postingDate}
                    disabled
                    className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="expireryDate" className="block">
                    Expiry Date:{" "}
                  </label>
                  <input
                    type="text"
                    id="expireryDate"
                    value={editedJob.expireryDate}
                    disabled
                    className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showDescription && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-96">
              <h2 className="text-lg font-semibold mb-4">Job Description</h2>
              <p>{selectedJobDescription}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCloseDescriptionModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4"
                >
                  Close
                </button>
                <button
                  onClick={handleCancelDescriptionModal}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
