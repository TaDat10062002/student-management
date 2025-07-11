import { useEffect } from "react";
import useDashBoardStore from "../../store/useDashBoardStore";
import { Toaster } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { Link, useSearchParams } from "react-router-dom";

const DepartmentPage = () => {
    const { departments, getDepartmentsPagination, isLoaded, pagination, updateDepartmentStatus } = useDashBoardStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 5;
    useEffect(() => {
        getDepartmentsPagination(search, page, item_per_page)
    }, [getDepartmentsPagination, search, page, item_per_page])

    return (
        <>
            <Toaster reverseOrder={true} />
            <div className='text-2xl text-center'>List of departments</div>
            {
                isLoaded ?
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 mx-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Department number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Department name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Department Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Update
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    departments.map((deparment, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {deparment.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    deparment.departmentType === 'natural' ?
                                                        <span className="bg-green-500 text-black p-2 rounded-2xl">{deparment.departmentType}</span> :
                                                        <span className="bg-yellow-500 text-black p-2 rounded-2xl">{deparment.departmentType}</span>
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    deparment.status === 'active' ?
                                                        <span className="p-2 bg-green-500 text-black rounded-2xl">active</span>
                                                        :
                                                        <span className="p-2 bg-yellow-500 text-black rounded-2xl">inactive</span>
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input onChange={() => {
                                                        const newStatus = deparment.status === 'active' ? 'inactive' : 'active'; updateDepartmentStatus(newStatus, deparment._id).then(() => {
                                                            getDepartmentsPagination(search, page, item_per_page)
                                                        })
                                                    }} type="checkbox" checked={deparment.status === 'active' ? true : false} className="sr-only peer" />
                                                    <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-green-600`} />
                                                </label>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="p-3 bg-amber-500 rounded-2xl text-white cursor-pointer">
                                                    <Link to={`${deparment._id}/edit`}>
                                                        Update department information
                                                    </Link>
                                                </span>
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

export default DepartmentPage