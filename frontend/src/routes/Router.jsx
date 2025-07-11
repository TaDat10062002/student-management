import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import useAuthStore from "../store/useAuthStore";

// ADMIN 
import AdminLoginPage from "../page/admin/AdminLoginPage";
import DashboardPage from "../page/admin/DashboardPage";
import DashBoardLayout from "../components/admin/DashBoardLayout";
import UsersPage from "../page/admin/UsersPage";
import DepartmentsPage from "../page/admin/DepartmentsPage";
import StudentClassPage from "../page/admin/StudentClassPage";
import CreateUserPage from "../page/admin/CreateUserPage";
import EditUserPage from "../page/admin/EditUserPage";
import CreateDepartmentPage from "../page/admin/CreateDepartmentPage";
import EditDepartmentPage from "../page/admin/EditDepartmentPage";
import ClassroomsPage from "../page/admin/ClassroomsPage";
import CreateClassroomPage from "../page/admin/CreateClassroomPage";
import EditClassroomPage from "../page/admin/EditClassroomPage";

// USERS
import Layout from "../components/Layout";
import LoginPage from "../page/users/LoginPage";
import InfoPage from "../page/users/InfoPage";
import ClassPage from "../page/users/ClassPage";
import DepartmentPage from "../page/users/DepartmentPage";
import TeacherDepartmentPage from "../page/users/TeacherDepartmentPage";
import SubjectPage from "../page/users/SubjectPage";
import CoursePage from "../page/users/CoursePage";
import StudentPage from "../page/users/StudentPage";
import TeacherCoursePage from "../page/users/TeacherCoursePage";
import StudentInTeacherCoursePage from "../page/users/StudentInTeacherCoursePage";
import PageNotFound from "../page/users/PageNotFound";
import SubjectsPage from "../page/admin/SubjectsPage";
import CreateSubjectPage from "../page/admin/CreateSubjectPage";
import EditSubjectPage from "../page/admin/EditSubjectPage";
import CoursesPage from "../page/admin/CoursesPage";
import CreateCoursesPage from "../page/admin/CreateCoursesPage";
import EditCoursePage from "../page/admin/EditCoursePage";
import RegisteredCoursePage from "../page/users/RegisteredCoursePage";
import RegisterCoursesPage from "../page/admin/RegisterCoursesPage";


export default function Router() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    // phai checkAuth kiem tra xem co cookies ko, co thi call api set authUser
    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    // cho thg nay loading den khi authUser !== null
    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        )
    }

    return (
        <Routes>
            {/* ADMIN */}
            <Route path="/admin" element={authUser && authUser.role === 'admin' ? (
                <Navigate to={'/admin/dashboard'} />
            ) : (
                <AdminLoginPage />
            )} />

            {/* layout cho dasboard  */}
            <Route path="/admin" element={authUser && authUser.role === 'admin' ? (<DashBoardLayout />) : (<Navigate to={'/admin'} />)} >
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="users/create" element={<CreateUserPage />} />
                <Route path="users/:id/edit" element={<EditUserPage />} />
                <Route path="departments" element={<DepartmentsPage />} />
                <Route path="departments/create" element={<CreateDepartmentPage />} />
                <Route path="departments/:id/edit" element={<EditDepartmentPage />} />
                <Route path="classrooms" element={<ClassroomsPage />} />
                <Route path="classrooms/:id/view-students" element={<StudentClassPage />} />
                <Route path="classrooms/create" element={<CreateClassroomPage />} />
                <Route path="classrooms/:id/update" element={<EditClassroomPage />} />
                <Route path="subjects" element={<SubjectsPage />} />
                <Route path="subjects/create" element={<CreateSubjectPage />} />
                <Route path="subjects/:id/edit" element={<EditSubjectPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="courses/create" element={<CreateCoursesPage />} />
                <Route path="courses/:id/edit" element={<EditCoursePage />} />
                <Route path="registered-courses" element={<RegisterCoursesPage />} />
            </Route>

            {/* TEACHER */}
            {authUser && authUser.role === 'teacher'} ? (
            <>
                {/* public route  */}
                <Route path="/login" element={authUser && authUser.role !== 'admin' ? <Navigate to={'/'} /> : <LoginPage />} />
                {/* protected routes */}
                <Route element={authUser && authUser.role !== 'admin' ? <Layout /> : <Navigate to={'/login'} />}>
                    <Route index element={<Navigate to={'info'} replace />} />
                    <Route path="info" element={<InfoPage />} />
                    <Route path="class" element={<ClassPage />} />
                    <Route path="class/:id/view" element={<StudentClassPage />} />
                    <Route path="student" element={<StudentPage />} />
                    <Route path="department" element={<DepartmentPage />} />
                    <Route path="department/:id/view" element={<TeacherDepartmentPage />} />
                    <Route path="subject" element={<SubjectPage />} />
                    <Route path="teacher-course" element={<TeacherCoursePage />} />
                    <Route path="teacher-course/:course_code/view-students" element={<StudentInTeacherCoursePage />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </>
            ) : (
            <>
                <Route>
                    <Route path="/login" element={authUser && authUser.role !== 'admin' ? <Navigate to={'/'} /> : <LoginPage />} />
                    {/* protected routes */}
                    <Route element={authUser && authUser.role !== 'admin' ? <Layout /> : <Navigate to={'/login'} />}>
                        <Route index element={<Navigate to={'info'} replace />} />
                        <Route path="info" element={<InfoPage />} />
                        <Route path="class" element={<ClassPage />} />
                        <Route path="class/:id/view" element={<StudentClassPage />} />
                        <Route path="department" element={<DepartmentPage />} />
                        <Route path="department/:id/view" element={<TeacherDepartmentPage />} />
                        <Route path="subject" element={<SubjectPage />} />
                        <Route path="course" element={<CoursePage />} />
                        <Route path="registered-course" element={<RegisteredCoursePage />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </>
            )
        </Routes>
    )
}