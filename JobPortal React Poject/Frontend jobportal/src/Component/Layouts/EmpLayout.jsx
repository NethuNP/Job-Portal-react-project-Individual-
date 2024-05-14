import React from 'react';
import { EmpSidebar } from '../EmpComponent/EmpSidebar';

import { Outlet } from 'react-router-dom';

const EmpLayout = () => {
    return (
        <div className='flex bg-white'>
            <div className='w-[12%] h-[]'>
                <EmpSidebar />
            </div>
            <div className='w-[89%]  border-blue'>
               <Outlet/>
                </div>

                
                
               
                
            </div>
       
    );
}

export default EmpLayout;
