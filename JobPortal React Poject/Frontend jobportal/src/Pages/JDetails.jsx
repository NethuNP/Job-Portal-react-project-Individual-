import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoBagRemoveSharp } from 'react-icons/io5';
import { FaUserTie } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { AuthContext } from '../Component/context/AuthContext';

const JDetails = () => {
    const { id } = useParams();
    const {user} = useContext(AuthContext)
    const [approvedJob, setApprovedJob] = useState(null);
    const [showUploadSection, setShowUploadSection] = useState(false);
    const [email, setEmail] = useState('');
   // const [user, setUser] = useState(null); // Assume user state

    useEffect(() => {
        fetch(`http://localhost:8070/approvedjobs/get/${id}`)
            .then(res => res.json())
            .then(data => setApprovedJob(data.job))
            .catch(error => {
                console.error('Error fetching job details:', error);
                alert('Error fetching job details');
            });
    }, [id]);

    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const selectFile = () => {
        fileInputRef.current.click();
    };

    const onFileSelect = (event) => {
        const selectedFiles = event.target.files;
        handleFiles(selectedFiles);
    };

    const handleFiles = (selectedFiles) => {
        if (selectedFiles.length === 0) return;
        for (let i = 0; i < selectedFiles.length; i++) {
            if (!files.some((e) => e.name === selectedFiles[i].name)) {
                setFiles((prevFiles) => [
                    ...prevFiles,
                    {
                        name: selectedFiles[i].name,
                        url: URL.createObjectURL(selectedFiles[i]),
                        file: selectedFiles[i],
                        mimeType: selectedFiles[i].type
                    },
                ]);
            }
        }
    };

    const onDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFiles = event.dataTransfer.files;
        handleFiles(droppedFiles);
    };

    const uploadFile = () => {
        if (files.length === 0 || !approvedJob || !email) return; 

        const formData = new FormData();
        const file = files[0].file;
        formData.append('application', file);
        formData.append('companyName', approvedJob.companyName);
        formData.append('jobTitle', approvedJob.jobTitle);
        formData.append('jobLocation', approvedJob.jobLocation);
        formData.append('postingDate', approvedJob.postingDate);
        formData.append('email', email);
        formData.append('mimeType', file.type);

        fetch('http://localhost:8070/applications/add', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setFiles([]);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'CV uploaded successfully',
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading application');
        });
    };

    const deleteFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const onDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    };

    const onDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24'>
            {approvedJob && (
                <>
                    <div>
                        {user ? (
                            <button className='bg-blue text-white px-4 py-3 mt-10 rounded-md' onClick={() => setShowUploadSection(true)}> Apply Now </button>
                        ) : (
                            <div className="text base text-primary font-medium space-x-5 hidden lg:block">
                                <Link to="/login" className="py-2 px-5 bg-blue text-white border-2 border-blue rounded font-bold hover:text-blue hover:bg-white mt-20">
                                    Register For Apply
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="bg-[#b8ccf1] md:grid grid-cols-3 gap-5 lg:px-24 px-4 py-12 mt-3 h-auto mb-10 rounded-3xl shadow-3xl">
                        <div className='bg-white p-4 rounded shadow-3xl'>
                            <div className='font-bold pb-5 text-2xl text-blue'>Details</div>
                            <div className='flex items-center mb-4 justify-center'>
                                <span className='font-semibold text-xl bg-gray-200 text-black py-2 border-2 rounded-full  hover:bg-gray-400 px-5 hover:text-white'>{approvedJob.companyName}</span>
                            </div>
                            <div className='flex items-center mb-4'>
                                <FaUserTie className='mr-2 text-[20px]' />
                                <h1 className='font-semibold'> Title: {approvedJob.jobTitle}</h1>
                            </div>
                            <div className='flex items-center mb-4'>
                                <IoBagRemoveSharp className='mr-2 text-[20px]' />
                                <span className='font-semibold'>Job Type: {approvedJob.employmentType}</span>
                            </div>
                            <div className='flex items-center mb-4'>
                                <RiMapPin2Fill className='mr-2 text-[20px]' />
                                <span className='font-semibold'>Location: {approvedJob.jobLocation}</span>
                            </div>
                            <div className='flex items-center mb-4'>
                                <FaMoneyCheckDollar className='mr-2 text-[20px]' />
                                <span className='font-semibold'>Salary: Rs: {approvedJob.minPrice} - {approvedJob.maxPrice}</span>
                            </div>
                        </div>
                        <div className='bg-white p-4 rounded col-span-2 shadow-3xl'>
                            <div className='font-semibold text-2xl text-blue'>Description</div>
                            <div className='mt-5 font-medium'>{approvedJob.description}</div>
                        </div>
                        
                        {showUploadSection && (
                            <div className='bg-white p-4 rounded shadow-3xl col-span-full mt-5'>
                                <div className='font-bold pb-5 text-2xl text-blue'>Upload CV</div>
                                <div>
                                    <label htmlFor="email" className='block mb-2 text-sm font-medium text-blue'>Enter your email here :</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className='block w-1/4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='drag-area h-[150px] border-r-[2px] border-[2px] border-dashed border-blue bg-white flex justify-center items-center select-none mt-4' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                                    {isDragging ? (
                                        <span className='select'>Drop Your CV Here</span>
                                    ) : (
                                        <>
                                            <div className='text-2xl text-blue'>  Drag & Drop CV Here or{" "} </div>
                                            <span className='select text-purple-800 ml-[8px] text-2xl font-bold cursor-pointer transition:0.4s hover:opacity-[0.6]' role='button' onClick={selectFile}>
                                                Browse
                                            </span> 
                                        </>
                                    )}
                                    <input name='file' type='file' className='file hidden' multiple ref={fileInputRef} onChange={onFileSelect} />
                                </div>
                                <div className='container w-[100%] h-auto flex justify-start items-start flex-wrap max-h-[200px] overflow-y-auto mt-[10px]'>
                                    {files.map((file, index) => (
                                        <div className='image w-[75px] mr-[5px] h-[75px] relative mb-[8px]' key={index}>
                                            <span className='delete absolute top-[-2px] r-[9px] font-[20px] cursor-pointer z-[999] text-blue' onClick={() => deleteFile(index)}>&times;</span>
                                            <img src={file.url} alt={file.name} className='w-[100%] h-[100%] border-r-[5px] img-display ' />
                                        </div>
                                    ))}
                                </div>
                                <button type='button' className='w-[100%] p-[8px 13px] font-bold cursor-pointer border-0 outline-0 border-[#fff] bg-blue text-white rounded-lg py-1' onClick={uploadFile}>
                                    Upload
                                </button>
                            </div>
                        )}
                    </div> 
                </>
            )}
        </div>
    );
};

export default JDetails;
