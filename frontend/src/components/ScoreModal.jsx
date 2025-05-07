import React, { useState } from 'react'
import useCourseStore from '../store/useCourseStore';

const ScoreModal = ({ isOpen, handleClose, handleUpdateScore, student }) => {
    const [score, setScore] = useState();
    return (
        <>
            <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className={`${!isOpen ? 'hidden ' : ''}overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-sm mx-auto max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Do you want to update this student score?
                            </h3>
                            <button onClick={handleClose} type="button" className="cursor-pointer end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5">
                            <form className="space-y-4">
                                <div>
                                    <label className="block mb-2 text-center text-sm font-medium text-gray-900 dark:text-white">Score</label>
                                    <input type="number" min={0} max={10} name='score' defaultValue={student.score} onChange={(e) => setScore(e.target.value)} className=" text-sm rounded-lg  w-full p-2.5 dark:text-black dark:border-gray-500 dark:placeholder-black bg-white" placeholder="Student's score" />
                                </div>
                                <button onClick={(e) => { handleClose, handleUpdateScore(score) }} type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ScoreModal