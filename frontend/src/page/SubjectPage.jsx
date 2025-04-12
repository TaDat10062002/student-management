import React from 'react'
import StudentList from '../components/StudentList'
import Pagination from '../components/Pagination'

const SubjectPage = () => {
    return (
        <>
            <div className="relative mt-10 overflow-x-auto shadow-md ml-10 mr-10 rounded-md">
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

export default SubjectPage