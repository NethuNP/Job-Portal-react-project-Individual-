import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoBagRemoveSharp } from 'react-icons/io5';

const JDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8070/jobs/get/${id}`)
            .then(res => res.json())
            .then(data => setJob(data));
    }, []);

    const handleApply = async () => {
        const { value: file } = await Swal.fire({
            title: 'Upload Your CV Here',
            input: 'file',
            inputAttributes: {
                accept: 'file/*',
                'aria-label': 'Upload your CV'
            }
        });
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    title: 'Your uploaded CV',
                    imageUrl: e.target.result,
                    imageAlt: 'The uploaded CV'
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24'>
  {/*}  <h2 className='font-semibold'>Job Id:{id} </h2>*/}

    {job && (
        <>
            {/* Full-Time Button */}
            {/* <button className='bg-purple-800 px-8 py-2 text-white mr-4'>{job.employmentType}</button> */}

            {/* Apply Now Button */}
            <button className='bg-blue px-5 py-3 text-white' onClick={handleApply}>Apply Now</button>

            {/* Left */}
            <div className="bg-[#b8ccf1] md:grid grid-cols-3 gap-5 lg:px-24 px-4 py-12 mt-3">
                <div className='bg-white p-4 rounded shadow-3xl'>
                    <div className='font-bold'>Details</div>
                    <h1 className='font-semibold'> Title: {job.jobTitle}</h1>
                    <div className='flex items-center mb-4'>
                        {/* Icon */}
                        <IoBagRemoveSharp className='mr-2 text-[20px]' />
                        {/* Text */}
                        <span className='font-semibold'>Job Type</span>
                    </div>
                </div>

                {/* Right */}
                <div className='bg-white p-4 rounded col-span-2 shadow-3xl'>
                    <div className='font-semibold'>Description</div>
                    <div>
                        {job.description}
                    </div>
                </div>
            </div>
        </>
    )}
</div>

                

                
        
    );
};

export default JDetails;






