import React, { useEffect } from 'react'
import Spinner from '../../components/Spinner'
import Pagination from '../../components/Pagination'
import { Link, useSearchParams } from 'react-router-dom'
import useDepartmentStore from '../../store/useDepartmentStore'

const DepartmentPage = () => {
    const { getAllDepartments, pagination, isLoaded, departments } = useDepartmentStore();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const search = searchParams.get('search') || '';
    const item_per_page = searchParams.get('item_per_page') || 5;
    useEffect(() => {
        getAllDepartments(search, page, item_per_page);
    }, [getAllDepartments, search, page, item_per_page])
    return (
        <>
            <div className='text-3xl text-center mt-5'>List of departments</div>
            {
                isLoaded ?
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-20 mr-20 mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        department number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Department name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Department type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        View departments list
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    departments.map((department, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    department.name
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {department.departmentType}
                                            </td>
                                            <td>
                                                <Link to={`${department._id}/view`}>View teachers in department {department.name}</Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='text-lg font-medium p-3'>
                            Totals: {departments.length}
                        </div>
                    </div >
                    : <Spinner />
            }
            <Pagination pagination={pagination} />
        </>
    )
}

export default DepartmentPage