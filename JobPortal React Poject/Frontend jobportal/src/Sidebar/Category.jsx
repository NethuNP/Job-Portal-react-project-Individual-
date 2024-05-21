import React, {useEffect } from "react";
import InputField from '../Component/InputField';


const Category = ({ handleChange }) => {
  const handleInputChange = (event) => {
    const selectedValue = event.target.value; // Extract the selected value
    handleChange(selectedValue); // Pass the selected value to the parent component
  };

  

  return (
    <div className='bg-slate-100 rounded justify-center px-4 py-2 '>
      <h4 className='text-lg font-medium mb-2 text-blue'>Select Category</h4>
      <div>
        <label className='sidebar-label-container block relative mb-3 cursor-pointer'>
          <input type='radio' name='category' value='' onChange={handleInputChange} />
          <span className='checkmark'></span>Any
        </label>

        <InputField handleChange={handleInputChange} value='Education' title='Education' name='category' />
        <InputField handleChange={handleInputChange} value='Healthcare' title='Healthcare' name='category' />
        <InputField handleChange={handleInputChange} value='Marketing' title='Marketing' name='category' />
        <InputField handleChange={handleInputChange} value='Information Technology' title='Information Technology' name='category' />
        <InputField handleChange={handleInputChange} value='Restaurant' title='Restaurant' name='category' />
      </div>
    </div>
  );
};

export default Category;
