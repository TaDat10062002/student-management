import React, { useEffect, useState } from 'react'
import useCourseStore from '../../store/useCourseStore'
import Spinner from '../../components/Spinner';
import { useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import ScoreModal from '../../components/ScoreModal';
import toast from 'react-hot-toast';

const StudentInTeacherCoursePage = () => {
    const { getStudentInTeacherCourse, students, course, isLoaded, pagination, updateStudentScore } = useCourseStore();
    const [isOpen, setIsOpen] = useState(false);
    const [registeredCourseId, setRegisteredCourseId] = useState('');
    const { course_code } = useParams();
    useEffect(() => {
        getStudentInTeacherCourse(course_code)
    }, [getStudentInTeacherCourse, course_code])

    const [student, setStudent] = useState('');
    const handleUpdateScore = (score) => {
        if (score > 10 || score < 0) {
            setIsOpen(false);
            toast.error("Score must be from 0 - 10");
            return;
        }
        updateStudentScore(registeredCourseId, score, course_code);
        setIsOpen(false);
        return;
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div className='text-3xl text-center mt-5'>List of students {course} </div>
            {
                isLoaded ?
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-20 mr-20 mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Student number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fullname
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Department
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Class
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Score
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((student, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.studentInfo.fullName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.studentInfo.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.studentInfo.gender}
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.departmentInfo.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.classInfo.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    student.score || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => { setIsOpen(true), setRegisteredCourseId(student._id), setStudent(student) }} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="bg-yellow-400 text-black p-3 rounded-2xl cursor-pointer" type="button">
                                                    Update score
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='text-lg font-medium p-3'>
                            Totals: {students.length}
                        </div>
                    </div >
                    : <Spinner />
            }
            <ScoreModal isOpen={isOpen} handleClose={handleClose} handleUpdateScore={handleUpdateScore} student={student} />
            <Pagination pagination={pagination} />
        </>
    )
}

export default StudentInTeacherCoursePage