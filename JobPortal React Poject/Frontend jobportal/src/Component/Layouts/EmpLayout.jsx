import React from 'react';
import { EmpSidebar } from '../EmpComponent/EmpSidebar';

import { Outlet } from 'react-router-dom';
import EmpHeader from '../EmpComponent/EmpHeader';

const EmpLayout = () => {
    return (
        <div className='flex bg-white'>
            <div className='w-[12%] h-[]'>
                <EmpSidebar />
            </div>
            <div className='w-[89%]  border-blue'>
                <EmpHeader/>
               <Outlet/>
                </div>

                
                
               
                
            </div>
       
    );
}

export default EmpLayout;
