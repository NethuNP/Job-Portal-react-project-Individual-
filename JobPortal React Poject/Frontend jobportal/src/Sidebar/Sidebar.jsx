
import React, {useEffect } from "react";

import Location from './Location'
import WorkExperience from './WorkExperience'
import Type from './Type'







export const Sidebar = ({handleChange ,handleClick}) => {


  

  return (
    
    <div className='space-y-5 mb-5 '>
       <div className='text lg font-bold mb-2'/>
       
        <WorkExperience handleChange={handleChange}/>
        <Type handleChange={handleChange}/>
        <img src="./images/vecteezy-a-man-sitting-on-a-ch-unscreen.gif" autoPlay muted loop className='h-[180px]' ></img>
        

         
        
      
        
        
        
        
      
        


    </div>
    
    
  )
}
