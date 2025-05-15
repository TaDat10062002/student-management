import React, { useEffect } from 'react'
import useSubjectStore from '../../store/useSubjectStore'
import Pagination from '../../components/Pagination';
import { Link, useSearchParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Modal from '../../components/admin/Modal';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import useDashBoardStore from '../../store/useDashBoardStore';

const SubjectsPage = () => {
    const { subjects, isLoaded, pagination, getSubjects } = useSubjectStore();
    const { deleteSubject } = useDashBoardStore();
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 5;
    const [isOpen, setIsOpen] = useState(false);
    const [subjectId, setSubjectId] = useState('');
    const handleClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        getSubjects(search, page, item_per_page)
    }, [getSubjects, search, page, item_per_page])

    const handleDelete = () => {
        deleteSubject(subjectId)
    }

    return (
        <>
            <Toaster reverseOrder={true} />
            <div className='text-3xl text-center mt-5'>List of subjects</div>
            {
                isLoaded ?
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-20 mr-20 mt-5">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Subject number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Subject name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Number of credits
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Update subject
                                    </th>
                                    <th>
                                        Delete subject
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subjects.map((subject, index) => (
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" >
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {subject.name}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {subject.number_of_credits}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <span className="p-3 bg-amber-500 rounded-2xl text-white cursor-pointer">
                                                    <Link to={`${subject._id}/edit`} >Update subject information</Link>
                                                </span>
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <button onClick={() => { setIsOpen(true), setSubjectId(subject._id) }} type='button' className='bg-red-500 p-3 rounded-2xl'>delete subject</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='text-lg font-medium p-3'>
                            Totals: {subjects.length}
                        </div>
                    </div >
                    : <Spinner />
            }
            <Modal isOpen={isOpen} handleClose={handleClose} handleDelete={handleDelete} />
            <Pagination pagination={pagination} />
        </>
    )
}

export default SubjectsPage