import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../Component/AdminComponent/AdminHeader";

export default function JobCategory() {
  const [feedback, setFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    function getFeedback() {
      axios
        .get("http://localhost:8070/fedbacks/")
        .then((res) => {
          setFeedback(res.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
    getFeedback();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedback = feedback.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(feedback.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openReplyPopup = (feedbackItem, index) => {
    setSelectedFeedback({ ...feedbackItem, index });
    setShowReplyPopup(true);
  };

  const closeReplyPopup = () => {
    setSelectedFeedback(null);
    setShowReplyPopup(false);
    setReplyContent("");
  };

  const submitReply = () => {
    axios
      .post(`http://localhost:8070/fedbacks/reply/${selectedFeedback._id}`, {
        reply: replyContent,
      })
      .then((res) => {
        const updatedFeedback = [...feedback];
        updatedFeedback[selectedFeedback.index] = {
          ...updatedFeedback[selectedFeedback.index],
          reply: replyContent,
        };
        setFeedback(updatedFeedback);
        toast.success("Reply sent successfully");
        closeReplyPopup();
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Failed to send reply");
      });
  };

  const deleteFeedback = (feedbackId) => {
    if (window.confirm(`Are you sure you want to delete feedback ?`)) {
      axios
        .delete(`http://localhost:8070/fedbacks/delete/${feedbackId}`)
        .then((res) => {
          const updatedFeedback = feedback.filter(
            (item) => item._id !== feedbackId
          );
          setFeedback(updatedFeedback);
          toast.success("Feedback deleted successfully");
        })
        .catch((err) => {
          setError(err.message);
          toast.error("Failed to delete feedback");
        });
    }
  };

  return (
    <div>
      <AdminHeader />
      <ToastContainer />
      <div className="container mx-auto xl:px-30 px-4 bg-white mt-20 h-full w-full pb-10">
        <div className="py-4 px-10">
          <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold text-center">
            Feedbacks
          </h1>
          <div className="mt-10">
            <section>
              <div className="relative mx-1 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-black dark:text-white items-center m-auto border-2 shadow-3xl border-gray-300 rounded-xl">
                    <thead className="text-xs uppercase bg-[#2c42a5] dark:bg-gray-900 text-white">
                      <tr>
                        <th scope="col" className="p-5 text-center"></th>
                        <th scope="col" className="px-6 py-1 text-center">
                          {" "}
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Message
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Reply
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFeedback.map((feedbackItem, index) => (
                        <tr
                          className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={index}
                        >
                          <td className="p-4 text-center">
                            {indexOfFirstItem + index + 1}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {feedbackItem.name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {feedbackItem.email}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {feedbackItem.message}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {feedbackItem.reply}
                          </td>
                          <td className="px-6 py-4 text-center flex justify-center">
                            <button
                              className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3"
                              onClick={() => deleteFeedback(feedbackItem._id)}
                            >
                              <FaTrash />
                            </button>
                            <button
                              onClick={() =>
                                openReplyPopup(
                                  feedbackItem,
                                  indexOfFirstItem + index
                                )
                              }
                              className="bg-blue hover:bg-green-700 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3"
                            >
                              <RiMessage2Fill />
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
          <div className="flex justify-center mt-4 space-x-8 text-blue">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="hover:underline"
            >
              Previous
            </button>
            <span className="mx-2 text-black">
              Page {currentPage} of {Math.ceil(feedback.length / itemsPerPage)}
            </span>
            <button
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(feedback.length / itemsPerPage)
              }
              className="hover:underline"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showReplyPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8  shadow-xl w-96 rounded-3xl">
            <h2 className="text-xl mb-4 text-white font-bold pl-28 bg-[#2c42a5] dark:bg-gray-900 rounded-full py-2">
              Send Reply
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitReply();
              }}
            >
              <textarea
                className="w-full h-40 border rounded-lg p-2 mb-4"
                placeholder="Enter your reply here..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              ></textarea>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeReplyPopup}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2c42a5] hover:bg-blue-600 text-white font-bold px-4 py-2 rounded"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
