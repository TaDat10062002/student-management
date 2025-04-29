import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Filter from './Filter'

const Header = () => {
    return (
        <>
            <Navbar />
            <div className='flex'>
                <Search />
                <Filter />
            </div>

        </>
    )
}

export default Header