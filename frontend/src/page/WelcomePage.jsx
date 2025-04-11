import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
    return (
        <div className='welcome-page'>
            {/* full height of screen  */}
            <div className='grid grid-cols-12 h-screen'>
                <div className='col-span-5 bg-black relative'>
                    <div className='form-login text-white absolute border top-1/2 translate-x-1/3  font-mono'>
                        <form className=''>
                            <span className='block'>Login</span>
                            <span className='block'>Enter your account details</span>
                            <input className='block' type="text" name="userName" placeholder='Username' id="" />
                            <input className='block' type="password" name="password" placeholder='password' id="" />
                            <Link to="#">Forgot password?</Link>

                            <button className='bg-purple-500 px-25 py-1 block'>Login</button>
                        </form>
                    </div>
                </div>
                <div className='col-span-7 bg-purple-700'>
                    <div className='py-10 text-center'>
                        <span className='block text-2xl'>
                            Welcome to Student Management System
                        </span>
                        <span className='block text-2xl'>
                            Please Login to reach our system
                        </span>

                        <div className='mx-auto w-max mt-5 max-md:w-0.5'>
                            <img src="/public/img/welcomeposter.png" className='rounded-2xl' alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage