import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from '../page/WelcomePage'
import Dashboard from "../page/Dashboard";
import Layout from "../components/Layout";
import StudentPage from "../page/StudentPage";
import SubjectPage from "../page/SubjectPage";
import CoursePage from "../page/CoursePage";
import CreateStudentPage from "../page/CreateStudentPage";
import EditStudentPage from "../page/EditStudentPage";
import CreateSubjectPage from "../page/CreateSubjectPage";
import CreateCoursePage from "../page/CreateCoursePage";
import EditCoursePage from "../page/EditCoursePage";
import EditSubjectPage from "../page/EditSubjectPage";
export default function Router() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={'/welcome'} replace />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/courses" element={<CoursePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/*  student page */}
                    <Route path="/students" element={<StudentPage />} />
                    {/* create student page  */}
                    <Route path="/students/create" element={<CreateStudentPage />} />
                    {/* edit student page  */}
                    <Route path="/students/edit" element={<EditStudentPage />} />

                    {/*  subject page  */}
                    <Route path="/subjects" element={<SubjectPage />} />
                    {/* create subject page  */}
                    <Route path="/subjects/create" element={<CreateSubjectPage />} />
                    {/* edit subject page  */}
                    <Route path="/subjects/edit" element={<EditSubjectPage />} />

                    {/* course page  */}
                    <Route path="/courses" element={<CoursePage />} />
                    {/* create course page  */}
                    <Route path="/courses/create" element={<CreateCoursePage />} />
                    {/* edit course page */}
                    <Route path="/courses/edit" element={<EditCoursePage />} />
                </Route>
            </Routes>
        </>
    )
}