import express from "express";
import { protectedRoute, requireAdmin, requireAdminOrStudent, requireStudent, requireTeacher } from "../middleware/auth.middleware.js";
import { cancelRegisteredCourse, getAllRegisteredCourse, registerCourse, updateRegisterCourseStatus, updateScore } from "../controllers/registered_course.controller.js";
const routers = express.Router();

routers.get('/', protectedRoute, requireAdminOrStudent, getAllRegisteredCourse); // 3 roles
routers.post('/:id', protectedRoute, requireStudent, registerCourse);  // student
routers.put('/:id/edit-score', protectedRoute, requireTeacher, updateScore);  // teacher
routers.delete('/:id', protectedRoute, requireStudent, cancelRegisteredCourse); // student
routers.put('/:id/update-status', protectedRoute, requireAdmin, updateRegisterCourseStatus); // student
export default routers;
