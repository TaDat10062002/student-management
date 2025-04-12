import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const WelcomePage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/students"); // Navigate to the students page after 3 seconds
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className='welcome-page'>
            <div className='text-center text-2xl mt-50 font-medium font-mono'>
                Welcome to Student Management System
                <Spinner />
            </div>
        </div>
    )
}

export default WelcomePage