import { Route, Routes, Navigate } from "react-router-dom";
import WelcomePage from "../page/WelcomePage";

export default function Router() {
    return (
        <Routes>
            {/* from /  to /welcome s */}
            <Route path="/" element={<Navigate to="welcome" replace />} />
            <Route path="/welcome" element={<WelcomePage />} />
        </Routes>
    )
}