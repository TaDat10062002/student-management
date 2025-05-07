import React, { useState } from 'react'
import useAuthStore from '../../store/useAuthStore';
import { Toaster } from 'react-hot-toast';

const AdminLoginPage = () => {
    const { login } = useAuthStore();
    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
    });

    const handleLogin = (e) => {
        e.preventDefault();
        login(dataForm);
    }

    return (
        <>
            <Toaster position='top-right' reverseOrder={false} />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-2"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-2"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={(e) => handleLogin(e)}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminLoginPage