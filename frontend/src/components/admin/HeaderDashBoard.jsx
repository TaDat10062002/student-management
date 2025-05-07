import React from 'react'
import useAuthStore from '../../store/useAuthStore'

const HeaderDashBoard = () => {
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    }
    return (
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">Welcome, Admin!</h1>
            <button onClick={handleLogout}
                className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 text-sm">
                Logout
            </button>
        </header>
    )
}

export default HeaderDashBoard