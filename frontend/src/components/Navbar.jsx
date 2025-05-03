import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { Toaster } from 'react-hot-toast';

const Navbar = () => {
    const { logout } = useAuthStore();
    const [isClicked, setIsClicked] = useState(false);
    const handleLogout = async () => {
        logout();
    }
    return (
        <>
            <Toaster position='top-center' reverseOrder={false} toastOptions={{
                style: {
                    marginTop: '55px'
                }
            }} />
            <nav className="bg-blue-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <button type="button" onClick={() => { isClicked ? setIsClicked(false) : setIsClicked(true) }} className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex mx-auto gap-15">
                            <Link to={'/students'}>
                                <img className="h-8 w-auto rounded-2xl" src="/public/img/logo.png" alt="Your Company" />
                            </Link>
                            <div className='max-sm:hidden'>
                                <Link to={'/class'} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Class</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/department'} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Department</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/subject'} href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Subjects</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/courses'} href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Courses</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/registered-courses'} href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Registered Course</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/info'} className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Info settings</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link onClick={handleLogout} className="rounded-md text-gray-900 px-3 py-2 text-sm font-medium bg-white" aria-current="page">Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile menu, show/hide based on menu state. */}
                {
                    isClicked ?
                        <div className='sm:hidden' id="mobile-menu">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                <Link to="/class" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Class</Link>
                                <Link to="/department" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Department</Link>
                                <Link to="/subject" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Subjects</Link>
                                <Link to="/courses" className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Courses</Link>
                                <Link to="/registered-course" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Registered Courses</Link>
                                <Link to="/info" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Info</Link>
                                <Link onClick={handleLogout} className="block rounded-md text-gray-900 px-3 py-2 text-base font-medium bg-white" aria-current="page">Logout</Link>
                            </div>
                        </div> : ''
                }
            </nav >
        </>

    )
}

export default Navbar