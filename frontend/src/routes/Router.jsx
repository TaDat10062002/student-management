import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from '../page/WelcomePage'
import Dashboard from "../page/Dashboard";
import Layout from "../components/Layout";
import TeacherPage from "../page/Teacher/TeacherPage";
import CreateTeacherPage from "../page/Teacher/CreateTeacherPage";
import EditTeacherPage from "../page/Teacher/EditTeacherPage";
import StudentPage from "../page/Student/StudentPage";
import CreateStudentPage from "../page/Student/CreateStudentPage";
import EditStudentPage from "../page/Student/EditStudentPage";
import SubjectPage from "../page/Subject/SubjectPage";
import CreateSubjectPage from "../page/Subject/CreateSubjectPage";
import EditSubjectPage from "../page/Subject/EditSubjectPage";
import CoursePage from "../page/Course/CoursePage";
import CreateCoursePage from "../page/Course/CreateCoursePage";
import EditCoursePage from "../page/Course/EditCoursePage";

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={'/welcome'} replace />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* teacher page  */}
                    <Route path="/teachers" element={<TeacherPage />} />
                    {/* teacher create  */}
                    <Route path="/teachers/create" element={<CreateTeacherPage />} />
                    {/* edit teacher page  */}
                    <Route path="/teachers/edit" element={<EditTeacherPage />} />

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