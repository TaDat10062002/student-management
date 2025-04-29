import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createClass, getClass, getStudentByClass } from "../controllers/class.controller.js";
const routers = express.Router();

routers.get('/', protectedRoute, getClass);
routers.get('/:id/view', protectedRoute, getStudentByClass);
routers.post('/', protectedRoute, requireAdmin, createClass);

export default routers