import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24'>
      <div className="bg-blue md:grid grid-cols-3 gap-5 lg:px-24 px-4 py-12 mt-3 rounded-xl">
        <div className='bg-white p-4 rounded shadow-3xl'>
          {/* First image */}
          <motion.img

whileHover={{ scale: 1.05, transition: { duration: 0.2, ease: 'easeOut' } }} // Scale up smoothly on hover
whileTap={{ scale: 0.95 }} // Scale down on tap
          
            src='/images/4966412.jpg'
            alt='About Us Image'
            className='w-full h-auto rounded-lg mb-4'
          />
          {/* Second image */}
          <motion.img

whileHover={{ scale: 1.05, transition: { duration: 0.2, ease: 'easeOut' } }} // Scale up smoothly on hover
whileTap={{ scale: 0.95 }} // Scale down on tap
            src='/images/4966408.jpg' // Replace with the path to your second image
            alt='About Us Image'
            className='w-full h-auto rounded-lg'
          /> 
        </div>
        <div className='bg-white p-4 rounded col-span-2 shadow-3xl'>
          <div className='text-4xl font-semibold text-blue'> About Us </div>
          <div className='bg-gray-100 border-2 rounded-lg mt-3 px-3 py-3 shadow-3xl'>
            <p className='justify-center text-gray-700 mt-3'>
              Welcome to JobNest, Sri Lanka's premier job portal connecting talented individuals with exciting career opportunities across the nation.
              <br />
              <br />
              At JobNest, we understand the importance of finding the right job that aligns with your skills, passions, and career aspirations.
              <br />
              <br />
              Whether you're a fresh graduate eager to kickstart your career or an experienced professional seeking new challenges, JobNest is here to help you navigate the job market with ease.
            </p>
          </div>
          <div className='text-4xl font-semibold text-blue mt-3'> Why Choose Us ?? </div>
          <div className='bg-gray-100 border-2 rounded-lg mt-3 px-3 py-3 shadow-3xl'>
            We have been able to win the trust of employers and clients for a long time and jobnest can identify us as a jobportal that is constantly in touch with the job market.
            <br />
            <br />
            We hope to continue working with the trust for many years
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
