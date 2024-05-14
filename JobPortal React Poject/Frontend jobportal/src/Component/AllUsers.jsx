import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { user } from 'fontawesome';


export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        function getUsers() {
            axios.get("http://localhost:8070/registers/")
                .then((res) => {
                    console.log(res.data);
                    setUsers(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getUsers();
    }, []);

    const DeleteUser = (id, firstName) => {
        if (window.confirm(`Are you sure you want to delete ${firstName}?`)) {
            // Add logic to delete the user
            axios
                .delete(`http://localhost:8070/registers/delete/${id}`)
                .then(() => {
                    // Optional: Provide feedback 
                    alert("User deleted successfully!");
                    // Optional: Update the user list after deletion
                    setUsers(users.filter(user => user._id !== id));
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error deleting user");
                });
        }
    };
    

    return (
        <div>
            <div className='bg-[#F8F9FC] mt-16'>
            <div className="py-[25px] px-[60px]  ">
                <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold ">
                    Registered Users
                </h1>
            </div>
            <div className='-mt-20 '>
                <section >
                    <div className="mt-[130px] mx-4 relative">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                           
                                <div className="relative mt-1">
                                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </div>
                                    
                                </div>
                            </div>
                            <table className="w-3/4 text-sm text-left rtl:text-right text-black dark:text-white items-center m-auto border-2 rounded shadow-3xl border-gray-300 bg-slate-500 ">
                                <thead className="text-xs  uppercase bg-[#10439F] dark:bg-gray-900 text-white">
                                    <tr>
                                        <th scope="col" className="p-4"></th>
                                        <th scope="col" className="px-6 py-3">
                                            First Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Last Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                                Actions
                                            </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={index}
                                        >
                                            <td className="w-4 p-4">{index + 1}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <button className="bg-green-500 hover:bg-yellow-600 text-gray-200 font-bold px-1 py-1 rounded mt-3 ml-6">
                                                        <GrView onClick={() => PostJob(job._id, job.companyName)}/>
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3" onClick={() => DeleteJob(job._id, job.companyName)}>
                                                        <FaTrash onClick={() => DeleteUser(user._id, user.firstName)}/>
                                                    </button>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    
                </section>
           </div>
        </div></div>
    );
}
