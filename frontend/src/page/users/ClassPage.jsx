import React, { useEffect } from 'react'
import useClassStore from '../../store/useClassStore'
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';

const ClassPage = () => {
    const { classrooms, pagination, isLoaded, getAllClasses } = useClassStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 5;
    useEffect(() => {
        getAllClasses(page, search, item_per_page)
    }, [getAllClasses, page, search, item_per_page])

    return (
        <>
            <div className='text-3xl text-center mt-5'>List of classes</div>
            {
                isLoaded ? <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-20 mr-20 mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Class number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Classname
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    View students list
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                classrooms.map((classroom, index) => (
                                    <tr key={classroom._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            {classroom.name}
                                        </td>
                                        <td>
                                            <Link to={`${classroom._id}/view`}>View students in class {classroom.name}</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className='text-lg font-medium p-3'>
                        Totals: {classrooms.length}
                    </div>
                </div >
                    : <Spinner />
            }
            <Pagination pagination={pagination} />
        </>
    )
}

export default ClassPage