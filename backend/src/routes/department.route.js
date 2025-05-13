import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createDepartment, getDepartmentById, getDepartments, getTeachersByDepartment, updateDepartment, updateDepartmentStatus } from "../controllers/department.controller.js";
const routers = express.Router();

// Department routes 
routers.get('/', protectedRoute, getDepartments); // 3 roles
routers.get('/:id/view', protectedRoute, getTeachersByDepartment); // 3 roles
routers.post('/', protectedRoute, requireAdmin, createDepartment);  // admin
routers.get('/:id/edit', protectedRoute, requireAdmin, getDepartmentById);  // admin
routers.put('/:id/update', protectedRoute, requireAdmin, updateDepartment);  // admin
routers.put('/:id/update-status', protectedRoute, requireAdmin, updateDepartmentStatus);  // admin
export default routers;
