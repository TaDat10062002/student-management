import React from 'react'
import Pagination from '../components/Pagination';
import StudentList from '../components/StudentList';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
const StudentPage = () => {
    return (
        <>
            <div className='grid grid-cols-6'>
                <div className='md:col-span-3 max-md:col-span-6 max-md:mx-auto'>
                    <Link to={'/students/create'} className='block ml-10 mt-5 bg-blue-500 rounded-md w-fit px-10 py-4 max-sm:mx-auto'>Add student</Link>
                </div>
                <div className='md:col-span-3 max-md:col-span-6 max-md:mx-auto mt-5 ml-auto mr-10'>
                    <SearchBar />
                </div>
            </div>
            <div className="relative mt-5 overflow-x-auto shadow-md ml-10 mr-10 rounded-md">
                <table className="w-full text-sm text-center  text-gray-500 dark:text-gray-40">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                        <tr>
                            <th scope="col" className="py-3">
                                Student id
                            </th>
                            <th scope="col" className="py-3">
                                Student name
                            </th>
                            <th scope="col" className="py-3">
                                Student age
                            </th>
                            <th scope="col" className="py-3">
                                Student grade
                            </th>
                            <th scope="col" className="py-3">
                                Gender
                            </th>
                            <th scope="col" className="py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <StudentList />
                </table>
            </div>
            <div className='ml-11 mt-10 text-lg font-semibold'>
                Amount of students: 4
            </div>
            <Pagination />
        </>
    )
}

export default StudentPage