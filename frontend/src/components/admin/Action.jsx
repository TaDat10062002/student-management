import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Search from '../../components/admin/Search'
import FilterByRecords from '../FilterByRecords'
import FilterByDepartment from './FilterByDepartment'
import FilterByRole from './FilterByRole'
import ClearFilter from './ClearFilter'

const Action = () => {
    const pathName = useLocation().pathname;
    const parts = pathName.split('/');
    const lastPart = parts[3];
    const createPart = parts[2];
    return (
        <>
            <div className='grid grid-cols-12 mt-2'>
                <div className='col-span-4'>
                    <Search />
                </div>
                <div className='col-span-2'>
                    <FilterByRecords />
                </div>
                <div className='col-span-2'>
                    <FilterByDepartment />
                </div>
                <div className='col-span-2'>
                    <FilterByRole />
                </div>
                <div className='col-span-2'>
                    <ClearFilter />
                </div>
            </div>
            {
                lastPart !== 'create' && createPart[2] === 'registered-courses' ?
                    <div className='grid grid-cols-12 mt-2'>
                        <div className='col-span-2'>
                            <Link to={`${parts[2]}/create`} className='p-3 bg-green-500 mt-5 rounded-md block w-fit ml-5 mr-5'>Create {createPart}</Link>
                        </div>
                    </div> : ''
            }
        </>
    )
}

export default Action