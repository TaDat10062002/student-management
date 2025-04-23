import express from "express";
import { protectedRoute, requireStudent, requireTeacher } from "../middleware/auth.middleware.js";
import { cancelRegisteredCourse, getAllRegisteredCourse, registerCourse, updateScore } from "../controllers/registered_course.controller.js";
const routers = express.Router();

routers.get('/', protectedRoute, requireStudent, getAllRegisteredCourse); // 3 roles
routers.post('/:id', protectedRoute, requireStudent, registerCourse);  // student
routers.put('/:id/edit', protectedRoute, requireTeacher, updateScore);  // teacher
routers.delete('/:id', protectedRoute, requireStudent, cancelRegisteredCourse); // student
export default routers;
