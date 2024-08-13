import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { AuthContext } from "../Component/context/AuthContext";
import EmpHeader from "../Component/EmpComponent/EmpHeader";
import { toast } from "react-toastify";

export default function MyApprovedJobs() {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedJob, setEditedJob] = useState({
    _id: "",
    companyName: "",
    jobTitle: "",
    jobLocation: "",
    postingDate: "",
    expireryDate: "",
    description: "",
    status: "Approved",
  });
  const [showDescription, setShowDescription] = useState(false);
  const [selectedJobDescription, setSelectedJobDescription] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user || !user.email) return;

      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8070/approvedjobs/",
          {
            params: { email: user.email },
          }
        );

        const filteredJobs = response.data.filter(
          (job) => job.postedBy === user.email
        );
        setJobs(
          filteredJobs.map((job) => ({
            ...job,
            status: job.status || "Approved",
          }))
        );
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Error fetching jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  jobs.sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate));

  const deleteJob = async (id, companyName) => {
    if (window.confirm(`Are you sure you want to delete ${companyName}?`)) {
      try {
        await axios.delete(`http://localhost:8070/jobs/delete/${id}`);
        setJobs(jobs.filter((job) => job._id !== id));
        toast.success("Job deleted successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Error deleting job");
      }
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    if (!editedJob.jobTitle || !editedJob.jobLocation) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      // Make sure to send status as "Approved" regardless of changes in the form
      const updatedJob = { ...editedJob, status: "Approved" };
      await axios.put(
        `http://localhost:8070/jobs/update/${editedJob._id}`,
        updatedJob
      );
      setShowEditModal(false);
      setJobs(
        jobs.map((job) => (job._id === editedJob._id ? updatedJob : job))
      );
      toast.success("Job updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error updating job. Please try again later.");
    }
  };

  const handleEdit = (job) => {
    setEditedJob(job);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditedJob({
      _id: "",
      companyName: "",
      jobTitle: "",
      jobLocation: "",
      postingDate: "",
      expireryDate: "",
      description: "",
      status: "Approved", // Reset status to default
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
      <EmpHeader />
      <div className="container xl:px-30 px-4 bg-white mt-20 h-full w-full pb-10">
        <div className="py-[px] px-[100px]">
          <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold mt-28">
            My Approved Jobs
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
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="8" className="text-center py-4">
                            Loading...
                          </td>
                        </tr>
                      ) : (
                        currentJobs.map((job, index) => (
                          <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            key={job._id}
                          >
                            <td className="p-4 text-center">
                              {indexOfFirstItem + index + 1}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {job.companyName}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {job.jobTitle}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {job.jobLocation}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {job.postingDate}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {job.expireryDate}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {job.status}
                            </td>
                            <td className="px-6 py-4 text-center flex justify-center">
                              <button
                                className="bg-green-500 hover:bg-green-600 text-gray-200 font-bold px-1 py-1 rounded mt-3"
                                onClick={() =>
                                  handleViewDescription(job.description)
                                }
                              >
                                <GrView />
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3"
                                onClick={() =>
                                  deleteJob(job._id, job.companyName)
                                }
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
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
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Edit Job</h2>
              <form onSubmit={handleSubmitEdit}>
                <div className="mb-2">
                  <label htmlFor="companyName" className="block">
                    Company Name:
                  </label>
                  <input
                    id="companyName"
                    value={editedJob.companyName}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        companyName: e.target.value,
                      })
                    }
                    className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="jobTitle" className="block">
                    Job Title:
                  </label>
                  <input
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
                    id="jobLocation"
                    value={editedJob.jobLocation}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        jobLocation: e.target.value,
                      })
                    }
                    className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="postingDate" className="block">
                    Posting Date:
                  </label>
                  <input
                    id="postingDate"
                    value={editedJob.postingDate}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        postingDate: e.target.value,
                      })
                    }
                    className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="expireryDate" className="block">
                    Expiry Date:
                  </label>
                  <input
                    id="expireryDate"
                    value={editedJob.expireryDate}
                    onChange={(e) =>
                      setEditedJob({
                        ...editedJob,
                        expireryDate: e.target.value,
                      })
                    }
                    className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
                    readOnly
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="status" className="block">
                    Status:
                  </label>
                  <select
                    id="status"
                    value={editedJob.status}
                    onChange={(e) =>
                      setEditedJob({ ...editedJob, status: e.target.value })
                    }
                    className="w-full bg-gray-100 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:bg-white focus:border-blue-500"
                    disabled // Disable editing of status
                  >
                    <option value="Approved">Approved</option>
                  </select>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showDescription && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Job Description</h2>
              <p>{selectedJobDescription}</p>
              <button
                onClick={handleCloseDescriptionModal}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
