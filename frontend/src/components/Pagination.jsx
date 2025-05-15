import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
const Pagination = ({ pagination }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';
    const page = searchParams.get('page') || 1;
    const item_per_page = searchParams.get('item_per_page') || 5;
    const departmentID = searchParams.get('departmentID') || '';
    const role = searchParams.get('role') || '';
    const totalPages = pagination.totalPages;
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    useEffect(() => {
        if (page > totalPages && !departmentID) {
            setSearchParams(`?page=1&item_per_page=${item_per_page}`)
        }
    }, [page > totalPages && !departmentID])

    const check = (departmentID ? `&departmentID=${departmentID}` : '') + (role ? `&role=${role}` : '') + (search ? `&search=${search}` : '');
    return (
        <div className='pagination text-center mt-5'>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10">
                    {
                        page > 1 ?
                            <li>
                                <Link to={`?page=${Number(page) - 1}${check}`} className="flex items-center justify-center px-4 h-10 leading-tight text-white bg-gray-900 rounded-l-md">Previous</Link>
                            </li>
                            : ''
                    }

                    {
                        pages.map((currentPage, index) => (
                            <li key={index}>
                                <Link to={`?page=${currentPage}${check}`} className={`bg-gray-900 ${currentPage === Number(page) ? ' bg-yellow-500' : ""} flex items-center justify-center px-4 h-10 leading-tight text-white hover:bg-gray-700`}>{currentPage}</Link>
                            </li>
                        ))
                    }
                    {
                        page < totalPages ?
                            <li>
                                <Link to={`?page=${Number(page) + 1}${check}`} className="flex items-center justify-center px-4 h-10 leading-tight text-white bg-gray-900 rounded-r-md">Next
                                </Link>
                            </li> : ''
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Pagination