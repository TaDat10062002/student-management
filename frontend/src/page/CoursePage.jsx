import React, { useEffect } from 'react'
import useCourseStore from '../store/useCourseStore'
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';

const CoursePage = () => {
    const { courses, isLoaded, studentOfCourse, pagination, getAllCourses } = useCourseStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 3;
    useEffect(() => {
        getAllCourses(search, page, item_per_page)
    }, [search, page, item_per_page])
    return (
        <>
            <div className='text-3xl text-center mt-5'>List of courses</div>
            {
                isLoaded ?
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-20 mr-20 mt-5">
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
                                    <th scope="col" className="px-6 py-3">
                                        Realistic amount
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
                                            <td className="px-6 py-4">
                                                {studentOfCourse[course.code]}/{course.amount} students
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
            <Pagination pagination={pagination} />
        </>
    )
}

export default CoursePage