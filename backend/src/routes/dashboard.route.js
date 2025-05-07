import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getClassrooms, getDashBoardStatistic, getDepartments } from "../controllers/dashboard.controller.js";

const routers = express.Router();

routers.get('/', protectedRoute, requireAdmin, getDashBoardStatistic);
routers.get('/department', protectedRoute, requireAdmin, getDepartments);
routers.get('/classroom', protectedRoute, requireAdmin, getClassrooms);

export default routers