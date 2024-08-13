import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-20 px-4 md:py-1 py-14 bg-white flex justify-between items-center mt-20">
      <div className="text-left">
        <motion.h1
          initial={{ y: "2rem", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 2,
            type: "spring",
          }}
        >
          <div className="text-5xl font-bold text-primary mb-5 pt-20">
            Find Your <span className="text-blue">Next Career</span>{" "}
            <span className="px-10">Adventure Here!</span>
          </div>
          <Link to="/jobs">
            <button className="bg-white text-blue hover:bg-blue hover:text-white border-2 border-[#4bacd3]  font-bold py-2 px-4 rounded-full ml-44">
              Learn more
            </button>
          </Link>
        </motion.h1>
      </div>

      <motion.div
        initial={{ x: "7rem", opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 2,
          type: "spring",
        }}
        className="w-full aspect-[2/1] pt-5"
      >
        <video
          src="./images/new.mp4"
          autoPlay
          muted
          loop
          className="rounded-full"
        ></video>
      </motion.div>
    </div>
  );
};

export default Banner;
