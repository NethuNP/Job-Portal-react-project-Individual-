import React, { useEffect, useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import Card from "../Component/Card";
import AllJobs from "./AllJobs";
import { Sidebar } from "../Sidebar/Sidebar";
import axios from "axios";
import Category from "../Sidebar/Category";


const Jobs = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

 useEffect(()=>{
  axios.get ("http://localhost:8070/approvedjobs/")
  .then ((res) =>{
    setJobs(res.data);

  })
  .catch ((err)=>{
    console.error(err);
    alert ("Error fetching jobs");

  })
 })
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      startIndex,
      endIndex,
    };
  };

  // Function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(jobs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function for the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  // Main function to filter data
const filteredData = (jobs, selected, query) => {
  let filteredJobs = jobs;

  if (query) {
    filteredJobs = filteredJobs.filter(
      (job) => job.jobTitle && job.jobTitle.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (typeof selected === "string") {
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({ experienceLevel, employmentType, jobCategory }) =>
          (experienceLevel &&
            experienceLevel.toLowerCase() === selected.toLowerCase()) ||
          (employmentType &&
            employmentType.toLowerCase() === selected.toLowerCase()) ||
          (jobCategory && jobCategory.toLowerCase() === selected.toLowerCase())
      );
    }
  } else {
    console.error("Selected category is not a string:", selected);
  }
  // Slice the data based on current page
  const { startIndex, endIndex } = calculatePageRange();
  filteredJobs = filteredJobs.slice(startIndex, endIndex);

  return filteredJobs.map((data, index) => (
    <Card key={`${data.id}-${index}`} data={data} />
  ));
};



  

  const result = filteredData(jobs, selectedCategory, query);


  

  return (
    <div>
      <form>
        <div className="flex justify-center md:flex-row flex-col md:gap-5 gap-4 pt-5 mt-24">
          <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring focus-indigo-600 md:w-1/4 w-full">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="What position are you looking for?"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
              onChange={handleInputChange}
              value={query}
            />
            <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>
          <div className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring focus-indigo-600 md:w-1/4 w-full">
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Location"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
              value={""}
            />
            <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>
          <button
            type="submit"
            className="bg-blue py-2 px-8 text-white md:rounded-s-none rounded"
          >
            Search
          </button>
        </div>
      </form>
      {/* Main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* Left side */}
        <div>
          <div className="bg-slate-300 p-4 rounded shadow-gray-400 border-2 font-bold">
            Filter
          </div>
          <Sidebar handleChange={setSelectedCategory}/>
        </div>
        {/* Job cards */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          <AllJobs result={result} />
          {/* Pagination */}
          {result.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8 text-blue">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2 text-black">
                Page {currentPage} of{" "}
                {Math.ceil(jobs.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(jobs.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          )}
        </div>
        {/* Right side */}
        <div>
          <div className="bg-slate-300 p-4 rounded shadow-gray-400 border-2 mb-2 space-y-5 font-bold">
            Category
          </div>
          <Category handleChange={setSelectedCategory} />
        </div>
      </div>
    </div>
  );
};

export default Jobs;
