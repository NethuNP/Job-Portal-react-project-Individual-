import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24 pb-10'>
      <div className="grid gap-5 lg:px-10 py-12 mt-3 rounded-xl bg-gradient-to-b from-blue-300 to-blue-100 shadow-xl">
        {/* Image Section */}
        <div className='relative w-full h-80 overflow-hidden rounded-lg shadow-3xl'>
          <video
            src="/images/vecteezy_a-man-sitting-at-a-desk-with-a-computer-and-a-magnifying-glass_36249554 (1).mp4" autoPlay muted loop
            className='w-full h-full object-cover  '
            alt='About Us Image'
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
            <div className="text-white text-center">
              <h1 className="text-4xl font-semibold mb-4">Welcome to JOBNEST</h1>
              <p className="text-lg">Sri Lanka's premier job portal connecting talented individuals with exciting career opportunities across the nation.</p>
            </div>
          </div>
        </div>
        {/* Text Section */}
        <div className='bg-[#b8ccf1] p-6 rounded-lg shadow-2xl'>
          <div className='text-4xl font-semibold text-blue mb-8'data-aos="zoom-in"> About Us </div>
          <div className='bg-white border-2 rounded-lg p-6 shadow-2xl mb-8'data-aos="fade-up">
            <p className='text-gray-700'>
              Welcome to JOBNEST, Sri Lanka's premier job portal connecting talented individuals with exciting career opportunities across the nation.
              <br /><br />
              At JobNest, we understand the importance of finding the right job that aligns with your skills, passions, and career aspirations.
              <br /><br />
              Whether you're a fresh graduate eager to kickstart your career or an experienced professional seeking new challenges, JobNest is here to help you navigate the job market with ease.
            </p>
          </div>
          <div className='text-4xl font-semibold text-blue mb-8' data-aos="zoom-in"> Why Choose Us ?? </div>
          <div className='bg-white border-2 rounded-lg p-6 shadow-2xl'data-aos="fade-up">
            <p className='text-gray-700'>
              We have been able to win the trust of employers and clients for a long time and JobNest can identify us as a job portal that is constantly in touch with the job market.
              <br /><br />
              We hope to continue working with the trust for many years.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
