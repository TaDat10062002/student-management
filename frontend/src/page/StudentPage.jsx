import React from 'react'
import Pagination from '../components/Pagination';
import StudentList from '../components/StudentList';
import { Link } from 'react-router-dom';
const StudentPage = () => {
    return (
        <>
            <Link to={'/create'} className='block ml-10 mt-5 bg-blue-500 rounded-md w-fit px-5 py-2'>Add student</Link>
            <div className="relative mt-5 overflow-x-auto shadow-md ml-10 mr-10 rounded-md">
                <table className="w-full text-sm text-center  text-gray-500 dark:text-gray-400">
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