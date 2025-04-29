import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
const Pagination = ({ pagination }) => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const totalPages = pagination.totalPages;
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return (
        <div className='pagination text-center mt-5'>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10">
                    {
                        page > 1 ?
                            <li>
                                <Link to={`?page=${Number(page) - 1}`} className="flex items-center justify-center px-4 h-10 leading-tight text-white bg-gray-900 rounded-l-md">Previous</Link>
                            </li>
                            : ''
                    }

                    {
                        pages.map((currentPage, index) => (
                            <li key={index}>
                                <Link to={`?page=${currentPage}`} className={`bg-gray-900 ${currentPage === Number(page) ? ' bg-yellow-500' : ""} flex items-center justify-center px-4 h-10 leading-tight text-white hover:bg-gray-700`}>{currentPage}</Link>
                            </li>
                        ))
                    }
                    {
                        page < totalPages ?
                            <li>
                                <Link to={`?page=${Number(page) + 1}`} className="flex items-center justify-center px-4 h-10 leading-tight text-white bg-gray-900 rounded-r-md">Next
                                </Link>
                            </li> : ''
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Pagination