import express from "express";
import { createDepartment, createUser } from "../controllers/admin.controller.js";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
const routers = express.Router();

routers.post('/create-user/:typeOfUser', protectedRoute, requireAdmin, createUser);
export default routers