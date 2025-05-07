import React, { useEffect } from 'react'
import useCourseStore from '../../store/useCourseStore'
import { Link } from "react-router-dom";
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';

const TeacherCoursePage = () => {
    const { teacherCourses, getTeacherCourses, pagination, isLoaded } = useCourseStore();
    useEffect(() => {
        getTeacherCourses()
    }, [getTeacherCourses])

    return (
        <>
            <div className='text-3xl text-center mt-5'>List of teacher's courses</div>
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
                                        Subject
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Number of credits
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Student list
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teacherCourses.map((teacherCourse, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {teacherCourse.code}
                                            </td>
                                            <td>
                                                {teacherCourse.subjectInfo.name}
                                            </td>
                                            <td>
                                                {teacherCourse.subjectInfo.number_of_credits}
                                            </td>
                                            <td>
                                                <Link to={`/teacher-course/${teacherCourse.code}/view-students`} >View students in course {teacherCourse.code}</Link>
                                            </td>
                                        </tr >
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='text-lg font-medium p-3'>
                            Totals: {teacherCourses.length}
                        </div>
                    </div >
                    : <Spinner />
            }
            <Pagination pagination={pagination} />
        </>
    )
}

export default TeacherCoursePage