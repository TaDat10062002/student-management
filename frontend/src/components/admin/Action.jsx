import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Search from '../../components/admin/Search'
import FilterByRecords from '../FilterByRecords'

const Action = () => {
    const pathName = useLocation().pathname;
    const parts = pathName.split('/');
    const lastPart = parts[2]
    return (
        <>
            <div className='grid grid-cols-12 mt-2'>
                <div className='col-span-4'>
                    <Search />
                </div>
                <div className='col-span-4'>
                    <FilterByRecords />
                </div>
                <div className='col-span-4'>
                    <Link to={`${parts[2]}/create`} className='p-3 bg-green-500 mt-5 rounded-2xl block w-fit ml-auto mr-5'>Create {lastPart}</Link>
                </div>
            </div>
        </>


    )
}

export default Action