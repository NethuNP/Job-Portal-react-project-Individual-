import React from "react";
import {
  
  Routes,
  Route,
  Navigate
  
} from "react-router-dom";
import Home from "../Pages/Home";
import Jobs from "../Pages/Jobs";
import About from "../Pages/About";
import ContactUs from "../Pages/ContactUs";
import Layout from "../Component/Layouts/Layout";
import AdminLayout from "../Component/Layouts/AdminLayout";


import Adminlogin from "../Admin/Adminlogin";
import Dashboard from "../Admin/Dashboard";
import UserView from "../Admin/UserView";
import JobCategory from "../Admin/JobCategory";
import Reports from "../Admin/Reports";
import AdminLogout from "../Admin/AdminLogout";
import Login from "../Component/Login";
import EmpLogin from "../Employer/EmpLogin";
import SignUp from "../Component/SignUp";
import EmpLayout from "../Component/Layouts/EmpLayout";
import PostJob from "../Employer/PostJob";
import ManageJob from "../Employer/ManageJob";
import Applications from "../Employer/Applications";
import Emplogout from "../Employer/Emplogout";
import EmpDashboard from "../Employer/EmpDashboard";
import JDetails from "../Pages/JDetails";
import ApprovedJobs from "../Admin/ApprovedJobs";
import Chatbot from "../Component/chatbot";
import Feedback from "../Admin/Feedback";

//import Feedbacks from "../Admin/Feedbacks";




const Router= () => {
 
  return (
    <Routes>
    < Route path= "/"  element= {<Layout/>}> 
      < Route path= "/"  element= {<Navigate to= "/home" />}/>
      < Route path= "/home"  element= {<Home />}/> 
      < Route path= "/jobs"  element= {<Jobs />}/> 
      < Route path= "/aboutus"  element= {<About />}/> 
      < Route path= "/contactus"  element= {<ContactUs />}/>  
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/emplogin" element={<EmpLogin/>}/>
      <Route path="/jobs/:id" element={<JDetails/>}/>
     
   
      </Route>

    

      
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/userview"   element={<UserView/>}/>
        <Route path="/admin/jobcategory" element={<JobCategory/>}/>
       <Route path="/admin/approvedjobs" element={<ApprovedJobs/>}/>
       <Route path="/admin/feedback" element={<Feedback/>}/>
       
        <Route path="/admin/reports" element={<Reports/>}/>
        <Route path="/admin/logout" element={<AdminLogout/>}/>

      
        

        </Route>
        
        <Route path="/employer/emplogin" element={<EmpLogin/>}/>
        <Route path="/employer" element={<EmpLayout/>}>
        <Route path ="/employer/empdashboard" element={<EmpDashboard/>}/>
        <Route path="/employer" element={<Navigate to="/emplogin"/>}/>
        <Route path="/employer/postjob" element={<PostJob/>}/>
        <Route path="/employer/managejob" element ={<ManageJob/>}/>
        <Route path="/employer/applications" element={<Applications/>}/>
        <Route path="/employer/logout" element={<Emplogout/>}/>
        </Route>



  
      </Routes>
      
      
      
      
      
      



      

  )
}

export default Router;
