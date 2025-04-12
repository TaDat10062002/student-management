import React from 'react'
import { Link } from 'react-router-dom'

const EditCoursePage = () => {
    return (
        <>
            <Link to={'/courses'} className='bg-blue-500 w-fit mt-5 ml-25 px-10 py-3 flex gap-2 rounded-md max-sm:mx-auto'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Go back
            </Link>
            <form className="max-w-lg mx-auto mt-5 bg-blue-200 px-5 py-5 rounded-2xl">
                <h1 className='text-2xl text-center font-semibold'>Create course page</h1>
                <div>
                    <label for="countries" class="block text-sm font-medium text-gray-900 dark:text-black">Select course</label>
                    <select name='studentGrade' id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a course</option>
                        <option value="1">Math and Science</option>
                        <option value="1">Math and Science</option>
                        <option value="1">Math and Science</option>
                    </select>
                </div>
                <div>
                    <label for="countries" class="block text-sm font-medium text-gray-900 dark:text-black">Select student</label>
                    <select name='studentGrade' id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a student</option>
                        <option value="Ta Dat">Ta Dat</option>
                    </select>
                </div>
                <button type='submit' className=' w-fit block mx-auto font-medium bg-blue-500 px-25 py-2 mt-5 rounded-md'>
                    Submit
                </button>
            </form>
        </>
    )
}

export default EditCoursePage