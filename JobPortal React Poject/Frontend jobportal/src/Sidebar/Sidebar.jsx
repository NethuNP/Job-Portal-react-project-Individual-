import React from 'react'
import Location from './Location'
import WorkExperience from './WorkExperience'
import Type from './Type'







export const Sidebar = ({handleChange ,handleClick}) => {
  return (
    
    <div className='space-y-5 mb-5 '>
       <div className='text lg font-bold mb-2'/>
       
        <WorkExperience handleChange={handleChange}/>
        <Type handleChange={handleChange}/>
       
        

         
        
      
        
        
        
        
      
        


    </div>
    
    
  )
}
