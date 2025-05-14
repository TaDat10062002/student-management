import useDashBoardStore from '../../store/useDashBoardStore';
import { Link, useSearchParams } from "react-router-dom";
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
const ClassroomsPage = () => {
    const { classrooms, pagination, getClassroomsPagination, isLoaded } = useDashBoardStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 5;
    useEffect(() => {
        getClassroomsPagination(search, page, item_per_page)
    }, [getClassroomsPagination, search, page, item_per_page])
    return (
        <>
            <Toaster reverseOrder={true} />
            <div className='text-2xl text-center'>List of classrooms</div>
            {
                isLoaded ?
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 mx-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Class number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Class name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        List of students
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount of students
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    classrooms.map((classroom, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {classroom.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link to={`${classroom._id}/view-students`} className='p-3 bg-blue-400 text-black rounded-2xl'>View students in {classroom.name}</Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className='bg-green-300 text-black p-3 rounded-2xl'>
                                                    {classroom.amount} students
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link to={`${classroom._id}/update`} className='p-3 bg-amber-500 rounded-2xl text-white'>Update Classroom information</Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div >
                    : <Spinner />
            }
            <Pagination pagination={pagination} />
        </>
    )
}

export default ClassroomsPage