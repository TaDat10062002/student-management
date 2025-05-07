import React from 'react'
import AdminPanel from './AdminPanel'
import HeaderDashBoard from './HeaderDashBoard'
import { Outlet, useLocation } from 'react-router-dom'
import Action from './Action'

const DashBoardLayout = () => {

    const pathName = useLocation().pathname;
    const parts = pathName.split('/');
    return (
        <div className="min-h-screen flex bg-gray-100">
            <AdminPanel />
            <div className="flex-1 flex flex-col">
                <HeaderDashBoard />
                {
                    useLocation().pathname !== '/admin/dashboard' && parts[3] !== 'create' ?
                        <Action />
                        : ''
                }
                <Outlet />
            </div>
        </div>
    )
}

export default DashBoardLayout