import React, { useEffect, useState } from 'react'
import useDashBoardStore from '../../store/useDashBoardStore'
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import { Link, useSearchParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const UsersPage = () => {
    const { users, getUsers, isLoaded, pagination, updateAccountStatus } = useDashBoardStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 5;
    const departmentID = searchParams.get('departmentID') || '';
    const role = searchParams.get('role') || '';
    useEffect(() => {
        getUsers(search, page, item_per_page, departmentID, role)
    }, [getUsers, search, page, item_per_page, departmentID, role])

    return (
        <>
            <Toaster reverseOrder={true} />
            {
                isLoaded ?
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 mx-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        User number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fullname
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>
                                    <td scope="col" className="px-6 py-3">
                                        Update info
                                    </td>
                                    <th scope="col" className="px-6 py-3">
                                        Account status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.fullName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.role}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.gender}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link to={`${user._id}/edit`} className='text-blue-500 underline'>Update user info</Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`${user.status === 'active' ? 'bg-green-500 text-black p-2 rounded-md' : 'bg-yellow-500 text-black p-2 rounded-2xl'}`}>{user.status}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input onChange={() => {
                                                        const newStatus = user.status === 'active' ? 'inactive' : 'active'; updateAccountStatus(newStatus, user._id).then(() => {
                                                            getUsers(search, page, item_per_page, departmentID, role)
                                                        })
                                                    }} type="checkbox" checked={user.status === 'active' ? true : false} className="sr-only peer" />
                                                    <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-green-600`} />
                                                </label>
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
export default UsersPage
