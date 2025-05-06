import React from 'react'
import useAuthStore from '../store/useAuthStore'
import StudentNavbar from '../components/StudentNavbar.jsx';
import TeacherNavbar from './TeacherNavbar.jsx';
const Navbar = () => {
    const { authUser } = useAuthStore();
    if (authUser && authUser.role === 'student') {
        return (
            <>
                <StudentNavbar />
            </>
        )
    }

    if (authUser && authUser.role === 'teacher') {
        return (
            <>
                <TeacherNavbar />
            </>
        )
    }

}

export default Navbar