import express from "express";
import { createCourse } from "../controllers/course.controller.js";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";

const routers = express.Router();



routers.post('/', protectedRoute, requireAdmin, createCourse);
export default routers;
