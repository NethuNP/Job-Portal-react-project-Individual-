import React from 'react'
import { AdminSidebar } from '../AdminComponent/AdminSidebar'
import { Outlet } from 'react-router-dom'



const AdminLayout = () => {
  return (

    
    <div className='flex bg-white'>
    <div className='w-[12%] h-screen'>
        
        <AdminSidebar />
    </div>
    <div className='w-[89%] border-blue '>
       
       
       <Outlet/>
        </div>
        
       
        
    </div>
  )
}

export default AdminLayout