import React from 'react'
import { Link } from 'react-router-dom'

const SubjectList = () => {
    return (
        <tbody>
            <tr className="odd:bg-white">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900  dark:text-black">
                    1
                </th>
                <td className="px-6 py-4 font-medium text-gray-900  dark:text-black">
                    Math
                </td>
                <td className="px-6 py-4 font-medium text-gray-900  dark:text-black">
                    5
                </td>
                <td className="px-6 py-4 font-medium text-gray-900  dark:text-black">
                    10
                </td>
                <td className="px-6 py-4 font-medium text-gray-900  dark:text-black">
                    <Link to={'/subjects/edit'} className='bg-amber-400 px-5 py-2 text-black rounded-sm'>Edit</Link>
                    <Link className='bg-red-400 px-5 py-2 ml-3 text-black rounded-sm'>Delete</Link>
                </td>
            </tr>
        </tbody>
    )
}

export default SubjectList