import React, { useState } from 'react';
import { MdCircle } from "react-icons/md";
import EmpHeader from "../Component/EmpComponent/EmpHeader";
import axios from 'axios';

const Plans = () => {
    const [isYearly, setIsYearly] = useState(false);

    const buyfunction = async (name, unitAmount) => {
        try {
            const response = await axios.post('http://localhost:8070/plans/', { name, unit_amount: unitAmount });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const packages = [
        { name: "Starter", monthlyPrice: 19, yearlyPrice: 199, description: "buymw n wdnbw dbw ", monthlyPostJobs: 5, yearlyPostJobs: 50, trialDays: 5 },
        { name: "Advance", monthlyPrice: 39, yearlyPrice: 399, description: "buymw n wdnbw dbw ", monthlyPostJobs: 10, yearlyPostJobs: 100, trialDays: 10 },
        { name: "Premium", monthlyPrice: 59, yearlyPrice: 599, description: "buymw n wdnbw dbw ", monthlyPostJobs: 15, yearlyPostJobs: 150, trialDays: 14, green: <MdCircle /> }
    ];

    return (
        <div>
            <EmpHeader />
            <div className='md:px-14 p-4 max-w-s mx-auto py-10'>
                <div className='text-center'>
                    <h2 className='md:text-5xl text-3xl font-bold text-blue mb-2 mt-12'>Here are all our plans</h2>
                    <p className='text-tartiary md:w-1/3 mx-auto px-4'>You can buy our plans for posting your jobs</p>

                    {/*toggle pricing*/}
                    <div className=' mt-10'>
                        <label htmlFor='toggle' className='inline-flex items-center cursor-pointer'>
                            <span className='mr-8 text-2xl font-semibold'>Monthly</span>
                            <div className='w-14 h-6 bg-gray-300 rounded-full transition duration-200 ease-in-out'>
                                <div className={`w-6 h-6 rounded-full transition duration-200 ease-in-out ${isYearly ? "bg-gray-500 ml-8" : "bg-gray-500"}`}></div>
                            </div>
                            <span className='ml-8 text-2xl font-semibold'>Yearly</span>
                        </label>
                        <input type='checkbox' id='toggle' className='hidden' checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
                    </div>
                </div>

                {/*pricing cards*/}
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14 md:w-11/12 mx-auto'>
                    {packages.map((pkg, index) => (
                        <div key={index} className='border py-10 md:px-6 px-4 rounded-lg shadow-3xl'>
                            <h4 className='text-3xl font-bold text-center text-primary'>{pkg.name}</h4>
                            <p className='text-gray-500 text-center my-5'>{pkg.description}</p>
                            <p className='mt-5 text-center text-[#5687cffa] text-4xl font-bold'>
                                {isYearly ? `$${pkg.yearlyPrice}` : `$${pkg.monthlyPrice}`} <span className='text-base text-gray-500 font-medium'>/{isYearly ? 'year' : 'month'}</span>
                            </p>
                            <ul className='mt-4 space-y-2 px-4'>
                                <li className="flex items-center text-black"><MdCircle className="mr-2 text-green-600" /> Free Trial: {pkg.trialDays} days</li>
                                <li className="flex items-center text-black"> <MdCircle className="mr-2 text-green-600" /> {isYearly ? `Post ${pkg.yearlyPostJobs} Jobs/Year` : `Post ${pkg.monthlyPostJobs} Jobs/Month`}</li>
                            </ul>
                            <div className='w-full mx-auto mt-8 flex items-center justify-center'>
                                <button onClick={() => buyfunction(pkg.name, isYearly ? pkg.yearlyPrice : pkg.monthlyPrice)} className='bg-blue text-white px-5 py-2 rounded-2xl'>Get Started</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plans;
