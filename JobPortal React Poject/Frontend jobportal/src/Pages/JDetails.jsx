import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IoBagRemoveSharp } from 'react-icons/io5';
import { FaUserTie } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaMoneyCheckDollar } from "react-icons/fa6";


const JDetails = () => {
    const { id } = useParams();
    const [approvedJob, setApprovedJob] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8070/approvedjobs/get/${id}`)
            .then(res => res.json())
            .then(data => setApprovedJob(data.job))
            .catch(error => {
                console.error('Error fetching job details:', error);
                alert('Error fetching job details');
            });
    }, [id]);

    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    function selectFile() {
        fileInputRef.current.click();
    }

    function onFileSelect(event) {
        const files = event.target.files;
    }

    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;

        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                setImages((prevImages) => [
                    ...prevImages,
                    {
                        name: files[i].name,
                        url: URL.createObjectURL(files[i]),
                    },
                ]);
            }
        }
    }

    function uploadImage() {
        console.log('images:', images);
    }

    function deleteImage(index) {
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
    }

    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24'>
            {approvedJob && (
                <>
                    
                    {/* Left */}
                    <div className="bg-[#b8ccf1] md:grid grid-cols-3 gap-5 lg:px-24 px-4 py-12 mt-3 h-auto mb-10">
                        <div className='bg-white p-4 rounded shadow-3xl'>
                            <div className='font-bold pb-5 text-2xl text-blue'>Details</div>
                            <div className='flex items-center mb-4 justify-center'>
                                {/* Company Name */}
                                <span className='font-semibold text-xl bg-gray-200 text-black py-2 border-2 rounded-full px-28 hover:bg-gray-400 hover:text-white'>{approvedJob.companyName}</span>
                            </div>
                            <div className='flex items-center mb-4'>
                                {/* Icon */}
                                <FaUserTie className='mr-2 text-[20px]' />
                                {/* Text */}
                                <h1 className='font-semibold'> Title: {approvedJob.jobTitle}</h1>
                            </div>
                            <div className='flex items-center mb-4'>
                                {/* Icon */}
                                <IoBagRemoveSharp className='mr-2 text-[20px]' />
                                {/* Text */}
                                <span className='font-semibold'>Job Type:{approvedJob.employmentType}</span>
                            </div>
                            <div className='flex items-center mb-4'>
                                <RiMapPin2Fill className='mr-2 text-[20px]' />
                                <span className='font-semibold'>Location:{approvedJob.jobLocation}</span>
                            </div>
                            <div className='flex items-center mb-4'>
                                <FaMoneyCheckDollar className='mr-2 text-[20px]' />
                                <span className='font-semibold'>Salary: Rs :{approvedJob.minPrice} - {approvedJob.maxPrice}</span>
                            </div>
                        </div>
                        {/* Right */}
                        <div className='bg-white p-4 rounded col-span-2 shadow-3xl'>
                            <div className='font-semibold text-2xl text-blue'>Description</div>
                            <div>
                                {approvedJob.description}
                            </div>
                        </div>

                        <div className='bg-white p-4 rounded shadow-3xl col-span-full mt-5'>
                            <div className='font-bold pb-5 text-2xl text-blue'>
                            <div className='drag-area  h-[150px] border-r-[5px] border-[2px] border-dashed border-blue bg-white flex justify-center items-center select-none' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                               {isDragging?(
                                 <span className='select'>
                                 Drop Your CV Here
                             </span>

                               ): (
                                <>  
                                Drag & Drop CV Here or {""}
                                <span className='select text-purple-800 ml-[8px] cursor-pointer transition:0.4s hover:opacity-[0.6] ' role='button' onClick={selectFile}>
                                    Browse

                                </span>
                                </>

                               )}
                               
                               
                               
                                <input name='file' type='file' className='file hidden' multiple ref={fileInputRef} onChange={onFileSelect} >
                                </input>

                            </div>
                            <div className='container w-[100%] h-auto flex justify-start items-start flex-wrap max-h-[200px] overflow-y-auto mt-[10px]'>
                                {images.map((images,index)=> (
                                     <div className='image w-[75px] mr-[5px] h-[75px] relative mb-[8px]'  key={index}>
                                     <span className='delete absolute top-[-2px] r-[9px] font-[20px] cursor-pointer z-[999] text-blue' onClick={()=> deleteImage(index)}>&times;
                                             
                                     </span>
                                     <img src={images.url} alt={images.name} className='w-[100%] h-[100%] border-r-[5px] '/>
 
                                 </div>
                                 

                                ))}
                                
                                
                               

                            
                            </div>
                            <button type='button' className='w-[100%] p-[8px 13px] font-bold cursor-pointer border-0 outline-0 border-[#fff] bg-blue text-white rounded-lg py-1' onClick={uploadImage}> Upload

                            </button>
                        </div>
                    </div></div>
                </>
            )}
        </div>
    );
};

export default JDetails;
