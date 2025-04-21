import express from "express";
import { protectedRoute, requireAdmin, requireTeacherOrAdmin } from "../middleware/auth.middleware.js";
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from "../controllers/department.controller.js";
const routers = express.Router();

// Department routes 
routers.get('/', protectedRoute, getDepartments);
routers.post('/', protectedRoute, requireAdmin, createDepartment);
routers.put('/:id/edit', protectedRoute, requireAdmin, updateDepartment);
routers.delete('/:id', protectedRoute, requireAdmin, deleteDepartment);
export default routers;
