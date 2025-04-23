import express from "express";
import { createCourse, getAllCourse, updateCourse } from "../controllers/course.controller.js";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";

const routers = express.Router();

// Courses routes
routers.get('/', protectedRoute, getAllCourse); // 3 roles
routers.post('/', protectedRoute, requireAdmin, createCourse);  // admin
routers.put('/:id/edit', protectedRoute, requireAdmin, updateCourse);  // admin
routers.delete('/:id', protectedRoute, requireAdmin, createCourse);  // admin
export default routers;
