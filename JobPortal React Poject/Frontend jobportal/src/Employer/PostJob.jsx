import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Creatable from "react-select/creatable";

const PostJob = () => {
  const {
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [salaryType, setSalaryType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [expireryDate, setExpireryDate] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [requiredSkill, setRequiredSkill] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [description, setDescription] = useState("");
  const [postedBy, setpostedBy] = useState("");
  const [jobCategory, setCategory] = useState("");

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  useEffect(() => {
    // Set today's date as default value for postingDate
    const today = new Date().toISOString().split("T")[0];
    setPostingDate(today);
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setCompanyLogo(base64);
    }
  };

  const sendData = (e) => {
    e.preventDefault();
    const newJob = {
      companyName,
      jobTitle,
      companyLogo,
      minPrice,
      maxPrice,
      salaryType,
      jobLocation,
      postingDate,
      expireryDate,
      experienceLevel,
      employmentType,
      requiredSkill,
      description,
      postedBy,
      jobCategory,
    };
    axios
      .post("http://localhost:8070/jobs/add", newJob)
      .then(() => {
        alert("Job Added");
        reset(); // Reset all form fields
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="max-w-screen-lg mx-auto bg-gray-50 mt-16 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-blue mb-10">
        Post Jobs Here
      </h2>
      <form onSubmit={sendData} className="space-y-6">
        {/* Job Title and Company Name */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Enter job title"
              {...register("jobTitle")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              placeholder="Enter company name"
              {...register("companyName")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        </div>

        {/* Salary Details */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Salary
            </label>
            <input
              type="number"
              placeholder="Enter minimum salary"
              {...register("minPrice")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Salary
            </label>
            <input
              type="number"
              placeholder="Enter maximum salary"
              {...register("maxPrice")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Salary Type and Job Location */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Type
            </label>
            <select
              {...register("salaryType")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value="">Select salary type</option>
              <option value="Hourly">Hourly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Location
            </label>
            <input
              type="text"
              placeholder="Enter job location"
              {...register("jobLocation")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setJobLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Posting and Expiry Date */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posting Date
            </label>
            <input
              type="date"
              {...register("postingDate")}
              value={postingDate} // Set the value to the state
              readOnly // Make the field read-only
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              {...register("expireryDate")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setExpireryDate(e.target.value)}
            />
          </div>
        </div>

        {/* Experience Level and Job Category */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level
            </label>
            <select
              {...register("experienceLevel")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
              <option value="">Select experience level</option>
              <option value="NoExperience">No Experience</option>
              <option value="Internship">Internship</option>
              <option value="Work remotely">Work remotely</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Category
            </label>
            <select
              {...register("jobCategory")}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select job category</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Marketing">Marketing</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>

        {/* Required Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Required Skills
          </label>
          <Creatable
            isMulti
            options={options}
            onChange={(newValue) => setRequiredSkill(newValue)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Description
          </label>
          <textarea
            rows="5"
            placeholder="Enter job description"
            {...register("description")}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Upload Company Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Company Logo
          </label>
          <input
            type="file"
            accept=".jpeg, .png, .jpg"
            className="w-full text-sm text-gray-700 p-2.5 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            onChange={handleFileChange}
          />
        </div>

        {/* Posted By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Posted By
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("postedBy")}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setpostedBy(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue text-white py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
