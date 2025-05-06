import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import { useLocation } from 'react-router-dom'
import FilterByRecords from './FilterByRecords'
import FilterByDepartmentType from './FilterByDepartmentType'

const Header = () => {
    const pathName = useLocation().pathname;
    return (
        <>
            <Navbar />
            {
                pathName !== '/info' ?
                    <div className='grid grid-cols-12'>
                        <div className='md:col-span-8 col-span-12 max-md:mx-8'>
                            <Search />
                        </div>
                        <div className='md:col-span-4 max-md:col-span-12'>
                            <div className='flex gap-4 max-md:mx-auto w-fit'>
                                <FilterByDepartmentType />
                                <FilterByRecords />
                            </div>
                        </div>
                    </div>
                    : ''
            }
        </>
    )
}

export default Header