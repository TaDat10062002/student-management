import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createClass, getClass, getClassById, getStudentByClass, updateClass } from "../controllers/class.controller.js";
const routers = express.Router();

routers.get('/', protectedRoute, getClass);
routers.get('/:id/edit', protectedRoute, getClassById);
routers.get('/:id/view', protectedRoute, getStudentByClass);
routers.post('/', protectedRoute, requireAdmin, createClass);
routers.put('/:id/update', protectedRoute, requireAdmin, updateClass);

export default routers