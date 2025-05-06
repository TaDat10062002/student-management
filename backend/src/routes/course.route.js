import express from "express";
import { createCourse, deleteCourse, getAllCourse, getStudentInTeacherCourse, updateCourse } from "../controllers/course.controller.js";
import { protectedRoute, requireAdmin, requireTeacher } from "../middleware/auth.middleware.js";
import { getTeacherCourses } from "../controllers/course.controller.js";
const routers = express.Router();

// Courses routes
routers.get('/', protectedRoute, getAllCourse); // 3 roles
routers.get('/teacher-course', protectedRoute, requireTeacher, getTeacherCourses);
routers.get('/teacher-course/:id/view-students', protectedRoute, requireTeacher, getStudentInTeacherCourse);
routers.post('/', protectedRoute, requireAdmin, createCourse);  // admin
routers.put('/:id/edit', protectedRoute, requireAdmin, updateCourse);  // admin
routers.delete('/:id', protectedRoute, requireAdmin, deleteCourse);  // admin
export default routers;
