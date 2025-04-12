import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from '../page/WelcomePage'
import Dashboard from "../page/Dashboard";
import Layout from "../components/Layout";
import StudentPage from "../page/StudentPage";
import SubjectPage from "../page/SubjectPage";
import CoursePage from "../page/CoursePage";
import CreateStudentPage from "../page/CreateStudentPage";
export default function Router() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={'/welcome'} replace />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/students" element={<StudentPage />} />
                    <Route path="/subjects" element={<SubjectPage />} />
                    <Route path="/courses" element={<CoursePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* create student page */}
                    <Route path="/create" element={<CreateStudentPage />} />
                </Route>
            </Routes>
        </>
    )
}