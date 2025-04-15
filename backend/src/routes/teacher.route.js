import express from "express";
import { createTeacher, getAllTeachers, updateStudentMark } from "../controllers/teacher.controller.js";
import { isTeacher, protectedRoute } from "../middleware/auth.middleware.js";
const routers = express.Router();

routers.get('/', getAllTeachers)
routers.post('/', createTeacher)
routers.put('/:studentId/update-mark', protectedRoute, isTeacher, updateStudentMark)

export default routers