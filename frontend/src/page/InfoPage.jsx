import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import Spinner from '../components/Spinner';

const InfoPage = () => {
    const { authUser, updateUser, checkAuth, isLoaded } = useAuthStore();
    useEffect(() => {
        checkAuth()
    }, [])

    const [dataForm, setDataForm] = useState({
        fullName: authUser.fullName || '',
        dob: authUser.dob || '',
        gender: authUser.gender || '',
    })

    const handleUpdate = async (e) => {
        e.preventDefault();
        updateUser(authUser._id, dataForm);
    }

    return (
        <>
            {
                isLoaded ?
                    <div className='mt-15'>
                        <div className='text-center mb-10 text-3xl font-medium'><h1>{`Welcome to ${authUser.role} profile page`}</h1></div>
                        <form className="max-w-md mx-auto">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="fullName" id="fullName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" value={dataForm.fullName} onChange={(e) => setDataForm({ ...dataForm, fullName: e.target.value })} />
                                <label htmlFor="fullName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fullname</label>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="date" name="dob" id="dob" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" value={dataForm.dob} onChange={(e) => setDataForm({ ...dataForm, dob: e.target.value })} />
                                    <label htmlFor="dob" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date of birth</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <label htmlFor="" className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Gender</label>
                                    <select name="gender" value={dataForm.gender ?? ""} onChange={(e) => setDataForm({ ...dataForm, gender: e.target.value })} className='mt-3 border-2 rounded-sm'>
                                        <option value="" >Default</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-1 md:gap-6">
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="text" readOnly name="departmentID" id="departmentID" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={authUser.department.name} />
                                    <label htmlFor="departmentID" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your department</label>
                                </div>
                            </div>
                            {
                                authUser.role === 'teacher' ?
                                    <div className="grid md:grid-cols-1 md:gap-6">
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input type="text" readOnly name="departmentID" id="departmentID" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={authUser.experience + ' years'} />
                                            <label htmlFor="departmentID" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your lecture experience</label>
                                        </div>
                                    </div>
                                    : ''
                            }
                            {
                                authUser.role === 'student' ? <div className="grid md:grid-cols-1 md:gap-6">
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input type="text" readOnly name="classRoomId" id="classRoomId" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={authUser.class.name} />
                                        <label htmlFor="classRoomId" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your classroom</label>
                                    </div>
                                </div>
                                    : ''
                            }
                            <div className='bg-green-400 w-fit px-6 py-4 rounded-md text-black font-medium'>
                                Account role: {authUser.role}
                            </div>
                            <button type="btn" onClick={(e) => handleUpdate(e)} className=" block ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save changes</button>
                        </form>
                    </div>
                    : <Spinner />
            }

        </>
    )
}

export default InfoPage