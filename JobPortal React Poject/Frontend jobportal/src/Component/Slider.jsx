import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUserPen } from "react-icons/fa6";

export default function Slider() {
    const [feedback, setFeedback] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchFeedback() {
            try {
                const res = await axios.get("http://localhost:8070/feedbacks");
                if (res.data.length > 0) {
                    setFeedback(res.data);
                }
            } catch (err) {
                console.error("Error fetching feedback:", err);
            }
        }
        fetchFeedback();
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Duration of the animation in milliseconds
            delay: 200, // Delay before the animation starts in milliseconds
        });

        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % feedback.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [feedback]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % feedback.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + feedback.length) % feedback.length);
    };

    return (
        <div>
            <p className='text-2xl text-blue font-semibold pt-10 ml-10 mt-10'>Feedback</p>
            <div className="bg-blue mt-10 mb-10 py-5 shadow-3xl">
                <div className="max-w-3xl mx-auto relative">
                    <div className="flex">
                        <div className="w-11/12 mx-auto flex-shrink-0 p-4" data-aos="fade-in">
                            <div className="bg-white shadow-md p-6 h-auto border-2 border-gray-200 shadow-3xl rounded-xl">
                                {feedback.length > 0 ? (
                                    <>
                                        <div className="flex items-center">
                                            <FaUserPen className="mr-2 text-blue" />
                                            <h3 className="text-lg font-semibold text-blue">{feedback[currentIndex].name}</h3>
                                        </div>
                                        <br />
                                        <p className="text-gray-700">{feedback[currentIndex].message}</p><br />
                                        <p className="mt-2 text-gray-600">From: {feedback[currentIndex].email}</p>
                                        <hr className="border-gray-300 my-4" />
                                        <p className="mt-2 text-gray-600">Reply: {feedback[currentIndex].reply}</p><br />
                                        <p className='font-semibold text-blue pl-56'>- JOBNEST Team -</p>
                                    </>
                                ) : (
                                    <p className="text-black">Loading feedback...</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {feedback.length > 1 && (
                        <div className="absolute top-1/2 transform -translate-y-1/2 w-full px-4 flex justify-between">
                            <button onClick={prevSlide} className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full p-2">
                                &laquo;
                            </button>
                            <button onClick={nextSlide} className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full p-2">
                                &raquo;
                            </button>
                        </div>
                    )}
                    {feedback.length > 1 && (
                        <div className="flex justify-center mt-4">
                            {feedback.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                                ></div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
