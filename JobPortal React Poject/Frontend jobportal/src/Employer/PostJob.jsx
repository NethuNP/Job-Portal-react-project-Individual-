import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Creatable from "react-select/creatable";
import { FaRegBell, FaEnvelope, FaRegUserCircle } from 'react-icons/fa'; 
import EmpHeader from "../Component/EmpComponent/EmpHeader";

const PostJob = () => {
  
  const {
    register, formState:{errors},

  } = useForm();


  const [companyName,setCompanyName] =useState("");
const [jobTitle,setJobTitle] =useState("");
const [companyLogo,setCompanyLogo] =useState("");
const [minPrice,setMinPrice] =useState("");
const [maxPrice,setMaxPrice] =useState(""); 
const [salaryType,setSalaryType] =useState("");
const [jobLocation,setJobLocation] =useState("");
const [postingDate,setPostingDate] =useState("");    
const [expireryDate,setExpireryDate] =useState("");
const [experienceLevel,setExperienceLevel] =useState("");
const [requiredSkill,setRequiredSkill] =useState("");
const [employmentType,setEmploymentType] =useState("");
const [description,setDescription] =useState("");
const [postedBy,setpostedBy] =useState("");
const [jobCategory,setCategory] =useState("");       



function sendData(e) {
  e.preventDefault ();
  const newJob={
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
  jobCategory
};
axios.post("http://localhost:8070/jobs/add",newJob)
 .then(()=>{
  alert ("Job Added");
  
 })
 .catch ((err)=>{
  alert (err);
 });
}

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
    { value: "  ", label: "  " }
  ];


  
  return (
    <div>

    <div>
    <EmpHeader/>
    </div>

    
    
    <div className="max-w-screen-2xl container mx-auto xl:px-30 px-4 bg-[#F8F9FC]  mt-16 h-full pb-10">

      <div className="text-black font-sans font-bold text-3xl ml-20 pt-[25px]">Post <span className="text-blue ">Jobs </span></div>
      {/*form*/}
      <form onSubmit={sendData} className="space-y-5">
      
      <div className="bg-gray-100 py-[10px] px- lg:px-16 ml-[150px] mr-[150px] mt-10 border-2 shadow-3xl pb-3">
       
          {/*first row*/}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mt-5 ">
            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2  font-semibold">Job Title</label>
              <input
                type="text"
                placeholder="Title"
                {...register("jobTitle")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 font-semibold">Company Name</label>
              <input
                type="text"
                placeholder="Company Name"
                {...register("companyName")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>
          {/*second row*/}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 font-semibold">Minimum Salary</label>
              <input
                type="text"
                placeholder=""
                {...register("minPrice")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 font-semibold">Maximum Salary</label>
              <input
                type="text"
                placeholder=""
                {...register("maxPrice")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/*Third row*/}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 font-semibold">Salary Type</label>
              <select
                {...register("salaryType")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
              >
                onChange={(e) => setSalaryType(e.target.value)}
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 font-semibold">Job Location</label>
              <input
                type="text"
                placeholder="Ex:New York"
                {...register("jobLocation")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
                onChange={(e) => setJobLocation(e.target.value)}
              />
            </div>
          </div>

          {/*4th row*/}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 font-semibold">Job Posting Date</label>
              <input
                type="date"
                placeholder="Ex:2023-11-5"
                {...register("postingDate")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
                onChange={(e) => setPostingDate(e.target.value)}
              />
            </div>


            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 font-semibold">Job Expirery Date</label>
              <input
                type="date"
                placeholder="Ex:2023-11-5"
                {...register("expireryDate")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
                onChange={(e) => setExpireryDate(e.target.value)}
              />
            </div></div>


            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 font-semibold">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                
                <option value="">Choose your Experience</option>
                <option value="NoExperience">Hourly</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Yearly</option>
              </select>
            
          </div>

          <div className="lg:w-1/2 w-full ">
  <label className="block mb-2 font-semibold">Job Category</label>
  <select
    {...register("jobCategory")}
    className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">Choose job Category</option>
    <option value="Education">Education</option>
    <option value="Healthcare">Healthcare</option>
    <option value="Marketing">Marketing</option>
    <option value="Information Technology">Information Technology</option>
    <option value="Resturant">Restaurant</option> {/* Fixed typo in "Restaurant" */}
  </select>
</div></div>

          {/*5th row*/}
          <div className="bg-[#d4dee] w-full">
          
            <div>
              <label className="block mb-2 font-semibold ">Required Skill Sets</label>
              <Creatable
                options={options}
                isMulti
                className="block w-full flex-1 border-1 text-gray-900  focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
                onChange={(selectedOption) => setRequiredSkill(selectedOption)}
              />
            </div>
          </div>

          {/*6th row*/}

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 font-semibold">Company Logo</label>
              <input
                type="text"
                placeholder="Paste your company logo url"
                {...register("companyLogo")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
                onChange={(e) => setCompanyLogo(e.target.value)}
              />
            
            
           
</div>
           
            <div className="lg:w-1/2 w-full ">
              <label className="block mb-2 font-semibold">Employment Type</label>
              <select
                {...register("employmentType")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
              >
                onChange={(e) => setEmploymentType(e.target.value)}
                <option value="select">Choose your Experience</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            
          </div></div>

          {/*7th row*/}
          
          <div className="w-full">
            <label className="block mb-2 font-semibold">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none bg-white border-2 border-neutral-200"
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              placeholder="Job Description"
              
            ></textarea>
          </div>

          {/*last row*/}

          <div className="w-full">
            <label className="block mb-2 font-semibold">Job Posted By</label>

            <input
              type="text"
              placeholder="your email"
              {...register("postedBy")}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 border-2 border-neutral-200"
              onChange={(e) => setpostedBy(e.target.value)}
            />
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
          
      </div>
      </form>
    </div>
    
    
  </div>
    

  );
};



export default PostJob;
