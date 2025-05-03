import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { Toaster } from 'react-hot-toast';
import getCurrentUrl from '../lib/util';

const Navbar = () => {
    const { logout, authUser } = useAuthStore();
    const [isClicked, setIsClicked] = useState(false);
    const handleLogout = async () => {
        logout();
    }
    const active = 'bg-white text-yellow-500';
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
                            <Link to={'/info'}>
                                <img className="h-8 w-auto rounded-2xl" src="/public/img/logo.png" alt="Your Company" />
                            </Link>
                            <div className='max-sm:hidden'>
                                <Link to={'/class'} className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white hover:text-yellow-500
                                    ${getCurrentUrl() === 'class' ? active : ''}`}>Class</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/department'} className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white hover:text-yellow-500
                                      ${getCurrentUrl() === 'department' ? active : ''}
                                      `}>Department</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/subject'} className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white hover:text-yellow-500
                                      ${getCurrentUrl() === 'subject' ? active : ''}
                                    `}>Subjects</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/course'} className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white hover:text-yellow-500
                                      ${getCurrentUrl() === 'course' ? active : ''}
                                    `}>Courses</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/registered-course'} className={`rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white hover:text-yellow-500
                                      ${getCurrentUrl() === 'registered-course' ? active : ''}
                                    `}>Registered Course</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/info'} className={`rounded-md font-medium text-gray-300 hover:bg-white hover:text-yellow-500 px-3 py-2  ${getCurrentUrl() === 'info' ? active : ''}`} >Welcomes {authUser.fullName}</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link onClick={handleLogout} className="rounded-md bg-red-600 hover:bg-red-400 text-white px-3 py-2 text-sm font-medium ">Logout</Link>
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
                                <Link to="/class" className={`block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'class' ? active : ''} `}>Class</Link>
                                <Link to="/department" className={` block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'department' ? active : ''} `}>Department</Link>
                                <Link to="/subject" className={` block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'subject' ? active : ''} `}>Subjects</Link>
                                <Link to="/course" className={` block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'course' ? active : ''} `}>Courses</Link>
                                <Link to="/registered-course" className={` block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'registered-course' ? active : ''}`}>Registered Courses</Link>
                                <Link to="/info" className={` block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'info' ? active : ''}`}>Info</Link>
                                <Link onClick={handleLogout} className="block rounded-md px-3 py-2 text-base font-medium bg-red-600 text-white hover:bg-red-400" aria-current="page">Logout</Link>
                            </div>
                        </div> : ''
                }
            </nav >
        </>

    )
}

export default Navbar