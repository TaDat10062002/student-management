import React, { useEffect } from 'react'
import useStudentStore from '../store/useStudentStore'
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import { useSearchParams } from 'react-router-dom';

const StudentPage = () => {
    const { students, isLoaded, getStudents, pagination } = useStudentStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 5;
    const departmentType = searchParams.get('departmentType') || '';
    useEffect(() => {
        getStudents(search, page, item_per_page, departmentType)
    }, [getStudents, search, page, item_per_page, departmentType])

    return (
        <>
            <div className='text-3xl text-center mt-5'>List of students</div>
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
                                        Gender
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date of birth
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Department
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Class
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
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {student.fullName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.gender}
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.dob || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.departmentInfo.name && student.departmentInfo.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {student.classInfo.name}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='text-lg font-medium p-3'>
                            Totals: {students.length}
                        </div>
                    </div > : <Spinner />
            }
            <Pagination pagination={pagination} />
        </>
    )
}

export default StudentPage