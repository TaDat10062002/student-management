import React, { useEffect, useState } from 'react'
import useDashBoardStore from '../../store/useDashBoardStore';

const TeacherForm = ({ user }) => {
    const { departments, getDepartments, createUser } = useDashBoardStore();
    useEffect(() => {
        getDepartments()
    }, [])

    const [dataForm, setDataForm] = useState({
        fullName: '',
        email: '',
        password: '',
        department_id: '',
    })

    const handleCreate = (e) => {
        e.preventDefault();
        createUser(dataForm, user);
    }
    return (
        <form className="max-w-lg mx-auto shadow-md rounded-2xl">
            <h1 className='text-3xl font-medium text-center mb-5'>Create teacher</h1>
            <div className="relative z-0 w-100 mx-auto mb-5 group px-5 mt-5">
                <input onChange={(e) => setDataForm({ ...dataForm, fullName: e.target.value })} type="text" name="floating_fullname" id="floating_fullname" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                <label htmlFor="floating_fullname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fullname</label>
            </div>
            <div className="relative z-0 w-100 mx-auto mb-5 group px-5">
                <input onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>
            <div className="relative z-0 w-100 mx-auto mb-5 group px-5">
                <input onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " autoComplete='off' />
                <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <div className='flex justify-center'>
                <select className="w-full bg-gray-50 border max-w-xs border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-gray-500"
                    onChange={(e) => setDataForm({ ...dataForm, department_id: e.target.value })}
                >
                    <option value="">Department</option>
                    {
                        departments.map((department, index) => (
                            <option key={index} value={department._id}>{department.name}</option>
                        ))
                    }
                </select>
            </div>
            <button onClick={(e) => handleCreate(e)} type="button" className="cursor-pointer bg-green-500 w-90 py-3 rounded-md block mx-auto relative bottom-5 mt-10">Create</button>
        </form>
    )
}

export default TeacherForm