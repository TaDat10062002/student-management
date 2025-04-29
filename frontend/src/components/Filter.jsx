import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Filter = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const item_per_page = searchParams.get('item_per_page') || 5;
    const handleFilter = (e) => {
        e.preventDefault();
        setSearchParams(`&item_per_page=${e.target.value}`)
    }

    return (
        <form className="ml-auto mr-20 mt-5">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-gray-500" onChange={(e) => handleFilter(e)} value={item_per_page} >
                <option value="5">Choose records per page</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
        </form >
    )
}

export default Filter