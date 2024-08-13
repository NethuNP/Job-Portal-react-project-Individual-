import React from "react";
import InputField from "../Component/InputField";

const WorkExperience = ({ handleChange }) => {
  const handleInputChange = (event) => {
    handleChange(event.target.value);
  };

  return (
    <div className="bg-slate-100 rounded justify-center px-4 py-2 ">
      <h4 className="text-lg font-medium mb-2 text-blue">Work Experience</h4>
      <div>
        <label className="sidebar-label-container block relative mb-3 cursor-pointer">
          <input
            type="radio"
            name="test"
            id="test-any"
            value=""
            onChange={handleInputChange}
          />
          <span className="checkmark"></span>Any
        </label>

        <InputField
          handleChange={handleInputChange}
          value="Internship"
          title="Internship"
          name="test"
        />
        <InputField
          handleChange={handleInputChange}
          value="Remote"
          title="Remote"
          name="test"
        />
      </div>
    </div>
  );
};

export default WorkExperience;
