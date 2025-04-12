import React from 'react'
import { Link } from 'react-router-dom'

const EditSubjectPage = () => {
    return (
        <>
            <Link to={'/students'} className='bg-blue-500 w-fit mt-5 ml-25 px-10 py-3 flex gap-2 rounded-md max-sm:mx-auto'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Go back
            </Link>
            <form className="max-w-lg mx-auto mt-5 bg-blue-200 px-5 py-5 rounded-2xl">
                <h1 className='text-2xl text-center font-semibold'>Edit subject page</h1>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium dark:text-black">Subject name</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject name" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium dark:text-black">Subject credits</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject credits" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium dark:text-black">Subject class available</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Subject class available" required />
                </div>
                <button type='submit' className=' w-fit block mx-auto font-medium bg-blue-500 px-25 py-2 mt-5 rounded-md'>
                    Save changes
                </button>
            </form>
        </>
    )
}

export default EditSubjectPage