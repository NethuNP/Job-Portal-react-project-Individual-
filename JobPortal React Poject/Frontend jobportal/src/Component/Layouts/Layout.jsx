import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import Chatbot from '../chatbot'




const Layout = () => {
  return (
    <div>
    
    <Navbar/>
    <Outlet/>
    <Chatbot/>
    <Footer/>
    
    </div>
  )
}

export default Layout