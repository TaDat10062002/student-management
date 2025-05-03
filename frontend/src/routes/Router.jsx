import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import LoginPage from "../page/LoginPage";
import useAuthStore from "../store/useAuthStore";
import InfoPage from "../page/InfoPage";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import ClassPage from "../page/ClassPage";
import StudentClassPage from "../page/StudentClassPage";
import DepartmentPage from "../page/DepartmentPage";
import TeacherDepartmentPage from "../page/TeacherDepartmentPage";
import SubjectPage from "../page/SubjectPage";
import CoursePage from "../page/CoursePage";
import RegisteredCourse from "../../../backend/src/models/registered_course.model";
import RegisteredCoursePage from "../page/RegisteredCoursePage";
export default function Router() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    // phai checkAuth kiem tra xem co cookies ko, co thi call api set authUser
    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        )
    }

    return (
        <>
            <Routes>
                {/* public route  */}
                <Route path="/login" element={authUser ? <Navigate to={'/'} /> : <LoginPage />} />
                {/* protected routes */}
                <Route element={authUser ? <Layout /> : <Navigate to={'/login'} />}>
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
            </Routes>
        </>
    )
}