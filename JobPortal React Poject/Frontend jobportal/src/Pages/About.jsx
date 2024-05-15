import React from 'react';

const About = () => {
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-24 pb-10'>
      <div className="md:grid grid-cols-3 gap-5 lg:px-24 px-6 py-12 mt-3 rounded-xl bg-gradient-to-b from-gray-200 to-white shadow-xl">
        {/* Image Section */}
        <div className='bg-white rounded-lg overflow-hidden shadow-2xl'>
          <img
            src="/images/clarity-closeup-focal-point-spotlight-target-vision-concept.jpg"
            className='w-full h-full object-cover rounded'
            alt='About Us Image'
          />
        </div>
        {/* Text Section */}
        <div className='bg-white p-6 rounded-lg shadow-2xl col-span-2'>
          <div className='text-4xl font-semibold text-blue mb-6'> About Us </div>
          <div className='bg-gray-100 border-2 rounded-lg p-6 shadow-2xl mb-6'>
            <p className='text-gray-700'>
              Welcome to JobNest, Sri Lanka's premier job portal connecting talented individuals with exciting career opportunities across the nation.
              <br /><br />
              At JobNest, we understand the importance of finding the right job that aligns with your skills, passions, and career aspirations.
              <br /><br />
              Whether you're a fresh graduate eager to kickstart your career or an experienced professional seeking new challenges, JobNest is here to help you navigate the job market with ease.
            </p>
          </div>
          <div className='text-4xl font-semibold text-blue mb-6'> Why Choose Us ?? </div>
          <div className='bg-gray-100 border-2 rounded-lg p-6 shadow-2xl'>
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
