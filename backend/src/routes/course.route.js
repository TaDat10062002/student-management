import express from "express";
import { createCourse, getAllCourse, updateCourse } from "../controllers/course.controller.js";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";

const routers = express.Router();

// Courses routes
routers.get('/', protectedRoute, getAllCourse);
routers.post('/', protectedRoute, requireAdmin, createCourse);
routers.put('/:id/edit', protectedRoute, requireAdmin, updateCourse);
routers.delete('/:id', protectedRoute, requireAdmin, createCourse);
export default routers;
