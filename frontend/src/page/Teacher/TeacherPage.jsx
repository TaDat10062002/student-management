import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/SearchBar'
import TeacherList from '../../components/TeacherList'
import Pagination from '../../components/Pagination'

const TeacherPage = () => {
    return (
        <>
            <div className='grid grid-cols-6'>
                <div className='md:col-span-3 max-md:col-span-6 max-md:mx-auto'>
                    <Link to={'/teachers/create'} className='block ml-10 mt-5 bg-blue-500 rounded-md w-fit px-10 py-4 max-sm:mx-auto'>Add a teacher</Link>
                </div>
                <div className='md:col-span-3 max-md:col-span-6 max-md:mx-auto mt-5 ml-auto mr-10'>
                    <SearchBar />
                </div>
            </div>
            <div className="relative mt-5 overflow-x-auto shadow-md ml-10 mr-10 rounded-md">
                <table className="w-full text-sm text-center  text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                        <tr>
                            <th scope="col" className="py-3">
                                Teacher id
                            </th>
                            <th scope="col" className="py-3">
                                Teacher name
                            </th>
                            <th scope="col" className="py-3">
                                Subject
                            </th>
                            <th scope="col" className="py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <TeacherList />
                </table>
            </div>
            <div className='ml-11 mt-10 text-lg font-semibold'>
                Amount of teacher: 4
            </div>
            <Pagination />
        </>
    )
}

export default TeacherPage