import React, { useEffect, useState } from 'react'
import useRegisteredCourseStore from '../store/useRegisteredCourseStore'
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { useSearchParams } from 'react-router-dom';
import CancelModal from '../components/CancelModal';
import useAuthStore from '../store/useAuthStore';

const RegisteredCoursePage = () => {
    const { registeredCourses, isLoaded, pagination, getAllRegisteredCourses, cancelRegisteredCourse } = useRegisteredCourseStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 3;
    const [isOpen, setIsOpen] = useState(false);
    const [registeredCourseId, setRegisteredCourseId] = useState('');
    const { token } = useAuthStore();
    useEffect(() => {
        getAllRegisteredCourses(search, page, item_per_page);
        cancelRegisteredCourse()
    }, [getAllRegisteredCourses, cancelRegisteredCourse, search, page, item_per_page])

    const handleOpenCancelModal = (e) => {
        e.preventDefault();
        setIsOpen(true)
    }

    const handleCloseCancelModal = (e) => {
        e.preventDefault();
        setIsOpen(false)
    }

    const handleCancelModal = (e) => {
        const registeredCourseId = e.target.value;
        cancelRegisteredCourse(registeredCourseId, token, search, page, item_per_page);
    }

    return (
        <>
            <div className='text-3xl text-center mt-5'>List of Registered courses</div>
            {
                isLoaded ?
                    <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ml-20 mr-20 mt-5 ${isOpen ? 'blur-xs' : ''}  `}>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-3">
                                        Course number
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Course code
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Amount of students
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Teacher name
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Teacher email
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Subject name
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Number of credits
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Status of course
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Cancel this course
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Score
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    registeredCourses.map((registeredCourse, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {registeredCourse.courseInfo.code}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {registeredCourse.courseInfo.amount} students
                                            </td>
                                            <td className='px-6 py-4'>
                                                {registeredCourse.teacherInfo.fullName}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {registeredCourse.teacherInfo.email}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {registeredCourse.subjectInfo.name}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {registeredCourse.subjectInfo.number_of_credits}
                                            </td>
                                            <td className='px-6 py-4'>
                                                {
                                                    registeredCourse.status !== 'active' ?
                                                        <span className='bg-yellow-500 px-5 py-2 rounded-md text-gray-950'>Pending </span>
                                                        :
                                                        <span className='bg-green-500 px-6.5 py-2 rounded-md text-gray-950'>Active</span>
                                                }
                                            </td>
                                            <th scope="col" className="px-6 py-3">
                                                {
                                                    registeredCourse.status === 'active' ?
                                                        <button className='bg-red-300 px-3 py-2 text-white rounded-sm' disabled>Cancel this course</button>
                                                        :
                                                        <button className='bg-red-500 px-3 py-2 text-white rounded-sm cursor-pointer' onClick={(e) => { handleOpenCancelModal(e), setRegisteredCourseId(registeredCourse._id) }} >Cancel this course</button>
                                                }
                                            </th>
                                            <td className='px-6 py-4'>
                                                {registeredCourse.score || 'N/A'}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='text-lg font-medium p-3'>
                            Totals: {registeredCourses.length}
                        </div>
                    </div >
                    : <Spinner />
            }
            <CancelModal isOpen={isOpen} handleCloseCancelModal={handleCloseCancelModal} handleCancelModal={handleCancelModal} registeredCourseId={registeredCourseId} />
            <Pagination pagination={pagination} />
        </>
    )
}

export default RegisteredCoursePage