import { Link, useParams } from "react-router-dom"
import { Toaster } from "react-hot-toast";
import EditStudentForm from "../../components/admin/EditStudentForm";
import useDashBoardStore from "../../store/useDashBoardStore";
import { useEffect } from "react";
import Spinner from '../../components/Spinner';
import EditTeacherForm from "../../components/admin/EditTeacherForm";

const EditUserPage = () => {
    const { user, getUserById } = useDashBoardStore();
    const { id: userId } = useParams();
    useEffect(() => {
        getUserById(userId)
    }, [userId])
    return (
        <>
            <Toaster reverseOrder={true} />
            <Link to={'/admin/users'} className="p-4 m-5 bg-amber-400 rounded-md w-fit">Back to users page</Link>

            {
                user.role === 'student' ?
                    <EditStudentForm role={user.role} /> : <EditTeacherForm role={user.role} />
            }
        </>
    )
}

export default EditUserPage