import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust the number of items per page as needed

    useEffect(() => {
        function getUsers() {
            axios.get("http://localhost:8070/registers/")
                .then((res) => {
                    setUsers(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getUsers();
    }, []);

    const deleteUser = (id, firstName) => {
        if (window.confirm(`Are you sure you want to delete ${firstName}?`)) {
            axios
                .delete(`http://localhost:8070/registers/delete/${id}`)
                .then(() => {
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
                    alert("User deleted successfully!");
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error deleting user");
                });
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const nextPage = () => {
        if (currentPage < Math.ceil(users.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='bg-white mt-16'>
            <div className="py-[25px] px-[60px]">
                <h1 className="text-blue text-[28px] leading-[40px] cursor-pointer font-semibold">
                    Registered Users  
                </h1>
            </div>
            <div className='-mt-20'>
                <section>
                    <div className="mt-[130px] mx-4 relative">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-3/4 text-sm text-left rtl:text-right text-black dark:text-white items-center m-auto border-2 rounded shadow-3xl border-gray-300 bg-slate-500">
                                <thead className="text-xs uppercase bg-[#10439F] dark:bg-gray-900 text-white">
                                    <tr>
                                        <th scope="col" className="p-4"></th>
                                        <th scope="col" className="px-5 py-3">First Name</th>
                                        <th scope="col" className="px-5 py-3">Last Name</th>
                                        <th scope="col" className="px-5 py-3">Email</th>
                                        <th scope="col" className="px-3 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr
                                            className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            key={index}
                                        >
                                            <td className="w-4 p-4">{indexOfFirstItem + index + 1}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td className="flex">
                                               
                                                <button className="bg-red-500 hover:bg-red-600 text-gray-200 font-bold px-1 py-1 rounded ml-2 mt-3" onClick={() => deleteUser(user._id, user.firstName)}>
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                {/* Pagination */}
                <div className="flex justify-center mt-4 space-x-8 text-blue">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="hover:underline"
                    >
                        Previous
                    </button>
                    <span className="mx-2 text-black">
                        Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
                        className="hover:underline"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
