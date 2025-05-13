import React, { useEffect } from 'react'
import useDashBoardStore from '../../store/useDashBoardStore';
import { useSearchParams } from 'react-router-dom';

const FilterByRole = () => {
    const { getDepartments, departments } = useDashBoardStore();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 5;

    useEffect(() => {
        getDepartments();
    }, [])

    const handleFilter = (e) => {
        setSearchParams(`?page=${page}&item_per_page=${item_per_page}&role=${e.target.value}`)
    }

    return (
        <form className="mt-6 ml-5">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-gray-500" onChange={(e) => handleFilter(e)}>
                <option value="">Choose role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>
        </form >
    )
}
export default FilterByRole