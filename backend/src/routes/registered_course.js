import express from "express";
import { protectedRoute, requireStudent } from "../middleware/auth.middleware.js";
import { cancelRegisteredCourse, getAllRegisteredCourse, registerCourse } from "../controllers/registered_course.controller.js";
const routers = express.Router();

routers.get('/', protectedRoute, getAllRegisteredCourse);
routers.post('/:id', protectedRoute, requireStudent, registerCourse);
routers.delete('/:id', protectedRoute, requireStudent, cancelRegisteredCourse);
export default routers;
