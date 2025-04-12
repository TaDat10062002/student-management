import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="rounded-lg shadow-sm  ml-10 mr-10 bg-blue-800 mt-10 py-3">
            <span className="min-md:text-lg  block w-1/2 mx-auto text-center text-white">© 2025
                <Link to="/" className="hover:underline ml-2">Student Management System</Link>. All Rights Reserved.
            </span>
        </footer>
    )
}

export default Footer