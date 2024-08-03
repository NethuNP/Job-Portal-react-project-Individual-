import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Banner from "../Component/Banner";
import Slider from "../Component/Slider";
import Chatbot from "../Component/chatbot";

const Home = () => {
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    alert(`Subscribed with email: ${email}`);
  };

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          <div className="lg:w-1/4" data-aos="fade-right">
            <h3 className="text-3xl text-primary font-bold mb-3 mt-10">
              Why We <span className="text-blue">Better</span> than{" "}
              <span className="px-20">Others</span>
            </h3>
            <p className="text-base text-neutral-500 mt-4">
              We have been providing a large number of jobs over the years with
              reliable service
            </p>
            <p className="text-base text-neutral-500 mt-8">
              We are committed to continue to provide quality service for you
            </p>
          </div>

          {/* Featured Cards */}
          <div className="w-full lg:w-3/4">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 items-start md:gap-12 gap-8">
              <div
                className="bg-[rgba(255,255,255,0.04)] rounded-tl-[35px] rounded-br-[35px] h-64 shadow-3xl shadow-slate-400 p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-28 border-2 border-gray-300"
                data-aos="fade-down"
              >
                <div>
                  <img src="./images/21207.png" alt="" />
                  <h5 className="text-xl font-semibold text-primary text-center mt-2 text-[#4F81C7]">
                    Fast Job Posting
                  </h5>
                </div>
              </div>
              <div
                className="bg-[rgba(255,255,255,0.04)] rounded-tl-[35px] rounded-br-[35px] h-64 shadow-3xl shadow-slate-400 p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16 border-2 border-gray-300"
                data-aos="fade-up"
              >
                <div>
                  <img src="./images/search.png" alt="" />
                  <h5 className="text-xl font-semibold text-primary px-5 text-center mt-2 text-[#4F81C7]">
                    Fast Job Searching
                  </h5>
                </div>
              </div>
              <div
                className="bg-[rgba(255,255,255,0.04)] rounded-tl-[35px] rounded-br-[35px] h-64 shadow-3xl shadow-slate-400 p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-28 border-2 border-gray-300"
                data-aos="fade-down"
              >
                <div>
                  <img src="./images/secure.png" alt="" style={{ width: "400px" }} />
                  <h5 className="text-xl font-semibold text-primary text-center mt-2 text-[#4F81C7]">
                    Reliable Service
                  </h5>
                </div>
              </div>
              <div
                className="bg-[rgba(255,255,255,0.04)] rounded-tl-[35px] rounded-br-[35px] h-64 shadow-3xl shadow-slate-400 p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16 border-2 border-gray-300"
                data-aos="fade-up"
              >
                <div>
                  <img src="./images/setting.png" alt="" />
                  <h5 className="text-xl font-semibold text-primary px-5 text-center text-[#4F81C7]">
                    Easy Handling
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*<div>
        <Slider/>
  </div>*/}

        

        {/* Subscribe Us Section */}
        <div className="flex-col md:flex-row flex items-center justify-center p-6 bg-white  rounded-tl-[35px] rounded-br-[35px] shadow-3xl mt-20 border-gray-300"data-aos="fade-up">
          <div className="md:w-1/4 w-full mb-6 md:mb-0 pr-10">
            <img
              src="/images/44125599-removebg-preview.png"
              alt="Subscribe"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 w-full p-6 bg-white rounded-lg shadow-lg">
  <h2 className="text-3xl font-bold mb-4 text-blue">Subscribe to Our Newsletter</h2>
  <p className="mb-4 font-semibold">Stay updated with the latest jobs and alerts.</p>
  <form className="flex items-center" onSubmit={handleSubscribe}>
    <input
      type="email"
      placeholder="Enter your email"
      className="p-3 border border-gray-300 rounded-l mb-4 w-full"
      value={email}
      onChange={handleEmailChange}
      required
    />
    <button
      type="submit"
      className="bg-blue-500 text-white p-3  bg-blue mb-4 ml-3 font-semibold rounded-md"
    >
      Subscribe
    </button>
  </form>
</div>
</div>


      </div> 
    </>
  );
};

export default Home;
