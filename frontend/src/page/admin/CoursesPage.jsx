import React, { useEffect, useState } from 'react'
import useCourseStore from '../../store/useCourseStore';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import { Link, useSearchParams } from 'react-router-dom';
import Modal from '../../components/admin/Modal';
import useAuthStore from '../../store/useAuthStore';
import useDashBoardStore from '../../store/useDashBoardStore';
import { Toaster } from 'react-hot-toast';

const CoursesPage = () => {
    const { deleteCourse, getAllCourses, courses, pagination, isLoaded } = useDashBoardStore();
    const { updateCourseStatus } = useDashBoardStore();
    const { authUser } = useAuthStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 3;
    const [isOpen, setIsOpen] = useState(false);
    const [courseCode, setCourseCode] = useState('');

    useEffect(() => {
        getAllCourses(search, page, item_per_page)
    }, [getAllCourses, search, page, item_per_page]);

    const handleModal = (e) => {
        e.preventDefault();
        setIsOpen(true);
    }

    const handleClose = (e) => {
        e.preventDefault();
        setIsOpen(false);
    }

    const handleDelete = async () => {
        deleteCourse(courseCode)
        getAllCourses(search, page, item_per_page);
    }

    return (
        <>
            <Toaster reverseOrder={true} />
            <div className='text-3xl text-center mt-5'>List of courses</div>
            {
                isLoaded ?
                    <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ml-5 mr-5 mt-5 ${isOpen ? 'blur-xs' : ''} `}>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Course number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Course code
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Teacher
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Subject
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Number of credits
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount
                                    </th>
                                    {
                                        authUser.role !== 'admin' ?
                                            <th scope="col" className="px-6 py-3">
                                                Register this course
                                            </th> : ''
                                    }
                                    <th scope="col" className="px-6 py-3">
                                        Course status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Update course info
                                    </th>  <th scope="col" className="px-6 py-3">
                                        Delete course
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    courses.map((course, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {course.code}
                                            </td>
                                            <td className="px-6 py-4">
                                                {course.teacherInfo.fullName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {course.subjectInfo.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {course.subjectInfo.number_of_credits}
                                            </td>
                                            <td className="px-6 py-4">
                                                {course.amount} students
                                            </td>
                                            {
                                                authUser.role !== 'admin' ?
                                                    <td className="px-6 py-4">
                                                        <button onClick={(e) => { handleModal(e), setCourseId(course.code) }} className="block bg-green-400 text-black px-3 py-3 rounded-md" type="button">
                                                            Register course
                                                        </button>
                                                    </td> : ''
                                            }
                                            <td className="px-6 py-4">
                                                {
                                                    course.status === 'active' ?
                                                        <span className="p-2 bg-green-500 text-black rounded-2xl">active</span>
                                                        :
                                                        <span className="p-2 bg-yellow-500 text-black rounded-2xl">inactive</span>
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input onChange={() => {
                                                        const newStatus = course.status === 'active' ? 'inactive' : 'active'; updateCourseStatus(newStatus, course._id).then(() => {
                                                            getAllCourses(search, page, item_per_page)
                                                        })
                                                    }} type="checkbox" checked={course.status === 'active' ? true : false} className="sr-only peer" />
                                                    <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-green-600`} />
                                                </label>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="p-3 bg-amber-500 rounded-2xl text-white cursor-pointer">
                                                    <Link to={`${course._id}/edit`}>
                                                        Update
                                                    </Link>
                                                </span>
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <button onClick={() => { setIsOpen(true), setCourseCode(course.code) }} type='button' className='bg-red-500 p-3 rounded-2xl'>delete courses</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='text-lg font-medium p-3'>
                            Totals: {courses.length}
                        </div>
                    </div > : <Spinner />
            }
            <Modal isOpen={isOpen} handleClose={handleClose} handleDelete={handleDelete} />
            <Pagination pagination={pagination} />
        </>
    )
}

export default CoursesPage