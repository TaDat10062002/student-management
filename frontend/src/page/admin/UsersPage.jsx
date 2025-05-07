import React, { useEffect, useState } from 'react'
import useDashBoardStore from '../../store/useDashBoardStore'
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import { useSearchParams } from 'react-router-dom';

const UsersPage = () => {
    const { users, getUsers, isLoaded, pagination } = useDashBoardStore();
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 3;
    useEffect(() => {
        getUsers(page, item_per_page)
    }, [getUsers, page, item_per_page])
    return (
        <>
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
                                    <th scope="col" className="px-6 py-3">
                                        Update info
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Delete
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Hide account
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => (
                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
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
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">On/off</a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    : <Spinner />
            }
            <Pagination pagination={pagination} />
        </>
    )
}

export default UsersPage