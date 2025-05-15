import { useEffect, useState } from "react"
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import useRegisteredCourseStore from "../../store/useRegisteredCourseStore";
import { useSearchParams } from "react-router-dom";
import useDashBoardStore from "../../store/useDashBoardStore";

const RegisterCoursesPage = () => {
    const { isLoaded, registeredCourses, getAllRegisterCourses, pagination, updateRegisterCourseStatus } = useDashBoardStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 5;
    useEffect(() => {
        getAllRegisterCourses(search, page, item_per_page)
    }, [search, page, item_per_page])

    return (
        <>
            <div className='text-3xl text-center mt-5'>List of Registered courses</div>
            {
                isLoaded ?
                    <div className='relative overflow-x-auto shadow-md sm:rounded-lg ml-20 mr-20 mt-5'>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-3">
                                        Course number
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Course code
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Teacher name
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Subject name
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Number of credits
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-2 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    registeredCourses.map((registeredCourse, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {registeredCourse.courseInfo.code}
                                            </td>
                                            <td className="px-6 py-4">
                                                {registeredCourse.teacherInfo.fullName}
                                            </td>
                                            <td className="px-6 py-4">
                                                {registeredCourse.subjectInfo.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {registeredCourse.subjectInfo.number_of_credits}
                                            </td>
                                            <td className="px-6 py-4">
                                                {
                                                    registeredCourse.status === 'active' ?
                                                        <span className="p-2 bg-green-500 text-black rounded-2xl">active</span>
                                                        :
                                                        <span className="p-2 bg-yellow-500 text-black rounded-2xl">inactive</span>
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input onChange={() => {
                                                        const newStatus = registeredCourse.status === 'active' ? 'inactive' : 'active'; updateRegisterCourseStatus(newStatus, registeredCourse._id).then(() => {
                                                            getAllRegisterCourses(search, page, item_per_page)
                                                        })
                                                    }} type="checkbox" checked={registeredCourse.status === 'active' ? true : false} className="sr-only peer" />
                                                    <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-green-600`} />
                                                </label>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='text-lg font-medium p-3'>
                            Totals: 1
                        </div>
                    </div >
                    : <Spinner />
            }
            <Pagination pagination={pagination} />
        </>
    )
}

export default RegisterCoursesPage