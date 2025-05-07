import React, { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import Pagination from '../../components/Pagination'
import useDepartmentStore from '../../store/useDepartmentStore'

const TeacherDepartmentPage = () => {
    const { id } = useParams();
    const { teachers, pagination, isLoaded, getTeachersByDepartment } = useDepartmentStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 5;
    useEffect(() => {
        getTeachersByDepartment(id, search, page, item_per_page)
    }, [getTeachersByDepartment, id, search, page, item_per_page])

    return (
        <>
            <Link to={'/department'} className='block px-3 py-3 bg-blue-500 w-fit rounded-md ml-20 mt-5'>Back to Department page</Link>
            <div className='text-3xl text-center mt-5'>List of departments</div>
            {
                isLoaded ?
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-20 mr-20 mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Teacher number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Teacher name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Teacher email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date of birth
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Experience
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teachers.map((teacher, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {teacher.fullName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {teacher.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {teacher.dob || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {teacher.gender}
                                            </td>
                                            <td className="px-6 py-4">
                                                {teacher.experience && `${teacher.experience > 1 ? `${teacher.experience} years` : `${teacher.experience} year`} `}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='text-lg font-medium p-3'>
                            Totals: {teachers.length}
                        </div>
                    </div >
                    : <Spinner />
            }
            <Pagination pagination={pagination} />
        </>
    )
}

export default TeacherDepartmentPage