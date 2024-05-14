import React from 'react';
import InputField from '../Component/InputField';

const Type = ({ handleChange }) => {
  const handleInputChange = (event) => {
    handleChange(event.target.value); // Passes the selected value to the parent component
  };

  return (
    <div className='bg-slate-100 rounded justify-center px-4 py-2 '>
      <h4 className='text-lg font-medium mb-2 gap-10 text-blue'>Type</h4>
      <div>
        <label className='sidebar-label-container block relative mb-3 cursor-pointer'>
          <input type='radio' name='test' id='test-all' value='' onChange={handleInputChange} />
          <span className='checkmark'></span>All
        </label>

        <InputField handleChange={handleInputChange} value='Full-time' title='Full-time' name='test' />
        <InputField handleChange={handleInputChange} value='Part-time' title='Part-time' name='test' />
        <InputField handleChange={handleInputChange} value='Internship' title='Internship' name='test' />
      </div>
    </div>
  );
};

export default Type;
