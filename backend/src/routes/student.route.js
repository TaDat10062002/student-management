import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getStudents } from "../controllers/student.controller.js";
const routers = express.Router();

routers.get('/', protectedRoute, getStudents);

export default routers