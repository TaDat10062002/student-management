import React from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const FilterByDepartmentType = () => {
    const pathName = useLocation().pathname;
    const [searchParams, setSearchParams] = useSearchParams();
    const [departmentType] = searchParams.get('departmentType') || '';
    const item_per_page = searchParams.get('item_per_page') || 5;
    const page = searchParams.get('page') || 1;
    const handleFilter = (e) => {
        e.preventDefault();
        setSearchParams(`?page=${page}&departmentType=${e.target.value}&item_per_page=${item_per_page}`)
    }

    return (
        <>
            {
                pathName === '/student' ?
                    <form className="mt-5">
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-gray-500"
                            onChange={(e) => handleFilter(e)} value={departmentType} >
                            <option value="">Choose a department type</option>
                            <option value="natural">Natural</option>
                            <option value="society">Society</option>
                        </select>
                    </form >
                    : ''
            }
        </>


    )
}

export default FilterByDepartmentType