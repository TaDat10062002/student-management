import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import LoginPage from "../page/LoginPage";
import useAuthStore from "../store/useAuthStore";
import InfoPage from "../page/InfoPage";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import ClassPage from "../page/ClassPage";
import StudentClassPage from "../page/StudentClassPage";
import TeacherPage from "../page/TeacherPage";
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
                    <Route path="teacher" element={<TeacherPage />} />
                </Route>
            </Routes>
        </>
    )
}