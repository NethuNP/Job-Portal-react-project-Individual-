import React from "react";

const AllJobs = ({ result }) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-2 text-blue">
          {result.length} Jobs
        </h3>
      </div>
      <section>{result}</section>
    </>
  );
};

export default AllJobs;
