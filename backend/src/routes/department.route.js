import express from "express";
import { protectedRoute, requireAdmin, requireTeacherOrAdmin } from "../middleware/auth.middleware.js";
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from "../controllers/department.controller.js";
const routers = express.Router();

// Department routes 
routers.get('/', protectedRoute, getDepartments); // 3 roles
routers.post('/', protectedRoute, requireAdmin, createDepartment);  // admin
routers.put('/:id/edit', protectedRoute, requireAdmin, updateDepartment);  // admin
routers.delete('/:id', protectedRoute, requireAdmin, deleteDepartment);  // admin
export default routers;
