import React from 'react'
import { Link } from "react-router-dom";

const AdminPanel = () => {
    return (

        <>
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
                <div className="p-4 text-xl font-bold border-b border-gray-200">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="dashboard" className="block px-4 py-2 rounded hover:bg-yellow-100 text-gray-700">Dashboard</Link>
                    <Link to="users" className="block px-4 py-2 rounded hover:bg-yellow-100 text-gray-700">Manage Users</Link>
                    <Link to="departments" className="block px-4 py-2 rounded hover:bg-yellow-100 text-gray-700">Manage Departments</Link>
                    <Link to="classrooms" className="block px-4 py-2 rounded hover:bg-yellow-100 text-gray-700">Manage Classrooms</Link>
                    <Link to="subjects" className="block px-4 py-2 rounded hover:bg-yellow-100 text-gray-700">Manage Subjects</Link>
                    <Link to="courses" className="block px-4 py-2 rounded hover:bg-yellow-100 text-gray-700">Manage Courses</Link>
                    <Link to="registered-courses" className="block px-4 py-2 rounded hover:bg-yellow-100 text-gray-700">Manage Register Courses</Link>
                </nav>
            </aside>
        </>
    )
}

export default AdminPanel