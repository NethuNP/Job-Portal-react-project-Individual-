import React, { useState } from "react";
import Banner from "../Component/Banner";


const Home = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Banner query={query} handleInputChange={handleInputChange} />

      
      <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          <div className="lg:w-1/4">
            <h3 className="text-3xl text-primary font-bold mb-3 mt-10">
              Why We <span className="text-blue">Better</span> than{" "}
              <span className="px-20">Others</span>{" "}
            </h3>
            <p className="text-base text-neutral-500 mt-4 ">
              {" "}
              We have providing large number of jobs over the years with
              reliable service
            </p>
            <p className="text-base text-neutral-500 mt-8">
              {" "}
              We are committed to continue to provide quality service for you{" "}
            </p>
          </div>

          {/*featured cards*/}
          <div className="w-full lg:w-3/4">
            <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 items-start md:gap-12 gap-8">
              <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px]  h-64 shadow-3xl shadow-slate-400 p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-28 border-2 border-[#88aad1]">
                <div>
                  <img src="./images/21207.png" alt="" />
                  <h5 className="text-xl font-semibold text-primary px-5  text-center mt-2 text-[#4F81C7]">
                    Fast Job Posting
                  </h5>
                </div>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-64 shadow-3xl shadow-slate-400 p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16 border-2 border-[#88aad1]">
                <div>
                  <img src="./images/search.png" alt="" />
                  <h5 className="text-xl font-semibold text-primary px-5 text-center mt-2 text-[#4F81C7]">
                    Fast Job Searching
                  </h5>
                </div>
              </div>

              <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-64 shadow-3xl shadow-slate-400 p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-28 border-2 border-[#88aad1]">
  <div>
    <img src="./images/secure.png" alt="" style={{ width: '400px' }} />
    <h5 className="text-xl font-semibold text-primary px-5 text-center mt-2 text-[#4F81C7]">
      Reliable Service
    </h5>
  </div>
</div>


              <div className="bg-[rgba(255,255,255,0.04)] rounded-[35px] h-64 shadow-3xl shadow-slate-400 p-8 items-center flex justify-center hover:-translate-y-4 transition-all duration-300 cursor-pointer md:mt-16 border-2 border-[#88aad1]">
                <div>
                  <img src="./images/setting.png" alt="" />
                  <h5 className="text-xl font-semibold text-primary px-5 text-center mt-2 text-[#4F81C7]">
                    Easy Handling
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
