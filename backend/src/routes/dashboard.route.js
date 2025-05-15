import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getAllRegisterCourses, getClassrooms, getDashBoardStatistic, getDepartments, getSubjects, getTeachers } from "../controllers/dashboard.controller.js";

const routers = express.Router();

routers.get('/', protectedRoute, requireAdmin, getDashBoardStatistic);
routers.get('/department', protectedRoute, requireAdmin, getDepartments);
routers.get('/classroom', protectedRoute, requireAdmin, getClassrooms);
routers.get('/teacher', protectedRoute, requireAdmin, getTeachers);
routers.get('/subject', protectedRoute, requireAdmin, getSubjects);
routers.get('/registered-course', protectedRoute, requireAdmin, getAllRegisterCourses);

export default routers