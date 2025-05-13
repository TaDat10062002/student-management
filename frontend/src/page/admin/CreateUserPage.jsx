import { useState } from 'react'
import { Link } from 'react-router-dom'
import StudentForm from '../../components/admin/StudentForm';
import TeacherForm from '../../components/admin/TeacherForm';
import { Toaster } from 'react-hot-toast';

const CreateUserPage = () => {
    const [user, setUser] = useState('student');
    return (
        <>
            <Toaster reverseOrder={true} />
            <div className='flex justify-between mr-10'>
                <Link to={'/admin/users'} className='p-4 bg-amber-500 block mt-5 w-fit ml-5 rounded-2xl'>Back to users</Link>
                <form className="mt-6 ml-5">
                    <select className="bg-gray-50 border max-w-xs border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-gray-500" onChange={(e) => setUser(e.target.value)} value={user}>
                        <option value="">Choose account role to create</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </form >
            </div>
            {
                user === 'student' ?
                    <StudentForm user={user} />
                    :
                    <TeacherForm user={user} />
            }
        </>
    )
}

export default CreateUserPage