import React from 'react'
import { useSearchParams } from 'react-router-dom'

const ClearFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const handleClearFilter = () => {
        setSearchParams({})
    }
    return (
        <div onClick={handleClearFilter} className='bg-amber-300 w-fit px-3 py-2 mt-6 ml-5 hover:bg-amber-600 text-blue-500 cursor-pointer rounded-md'>Clear filter❌</div>
    )
}

export default ClearFilter