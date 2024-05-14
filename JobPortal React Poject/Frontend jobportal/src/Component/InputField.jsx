import React from 'react'

const InputField = ({handleChange,value,title,name}) => {
  return (
    <label className='sidebar-label-container block relative mb-3 cursor-pointer'>
            <input type='radio' name={name} value={value}  onChange={handleChange} />
            <span className='checkmark'></span> {title}</label>








    
  )
}

export default InputField