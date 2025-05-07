import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import getCurrentUrl from '../lib/util';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const TeacherNavbar = () => {
    const { logout } = useAuthStore();
    const [isClicked, setIsClicked] = useState(false);
    const handleLogout = async (e) => {
        e.preventDefault();
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
                        <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
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
                        <div className="flex flex-nowrap whitespace-nowrap mx-auto md:gap-8 max-lg:hidden">
                            <Link to={'/info'}>
                                <img className="max-md:hidden h-8 w-auto rounded-2xl" src="/public/img/logo.png" alt="Your Company" />
                            </Link>
                            <div className='max-sm:hidden'>
                                <Link to={'/department'} className={`max-lg:text-xs rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-white hover:text-yellow-500
                                      ${getCurrentUrl() === 'department' ? active : ''}
                                      `}>Department</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/class'} className={`max-lg:text-xs rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-white hover:text-yellow-500
                                    ${getCurrentUrl() === 'class' ? active : ''}`}>Class</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/student'} className={`max-lg:text-xs rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-white hover:text-yellow-500
                                    ${getCurrentUrl() === 'student' ? active : ''}`}>Student</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/subject'} className={`max-lg:text-xs rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-white hover:text-yellow-500
                                      ${getCurrentUrl() === 'subject' ? active : ''}
                                    `}>Subjects</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/teacher-course'} className={`max-lg:text-xs rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-white hover:text-yellow-500
                                      ${getCurrentUrl() === 'teacher-course' ? active : ''}
                                    `}>Teacher course</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <Link to={'/info'} className={`max-lg:text-xs rounded-md font-medium text-gray-300 hover:bg-white hover:text-yellow-500 px-2 py-2  ${getCurrentUrl() === 'info' ? active : ''}`} >Info page</Link>
                            </div>
                            <div className='max-sm:hidden'>
                                <button onClick={(e) => handleLogout(e)} className="cursor-pointer max-lg:text-xs max-lg:gap-x-0.5 rounded-md bg-red-600 hover:bg-red-400 text-white h-10 -mt-2.5 px-3 text-sm font-medium ">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile menu, show/hide based on menu state. */}
                {
                    isClicked ?
                        <div className='lg:hidden' id="mobile-menu">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                <Link to="/department" className={` block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'department' ? active : ''} `}>Department</Link>
                                <Link to="/class" className={`block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'class' ? active : ''} `}>Class</Link>
                                <Link to="/student" className={` block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'student' ? active : ''} `}>Student</Link>
                                <Link to="/subject" className={` block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'subject' ? active : ''} `}>Subject</Link>
                                <Link to="/teacher-course" className={` block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'teacher-course' ? active : ''} `}>Teacher course</Link>
                                <Link to="/info" className={`block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white hover:text-yellow-500 ${getCurrentUrl() === 'info' ? active : ''}`}>Info</Link>
                                <button onClick={(e) => handleLogout(e)} className="cursor-pointer block mt-2 rounded-md px-3 mx-auto w-full py-2 text-base font-medium bg-red-600 text-white hover:bg-red-400">Logout</button>
                            </div>
                        </div> : ''
                }
            </nav >
        </>
    )
}

export default TeacherNavbar