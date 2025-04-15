import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { specificRoleUser } from "../controllers/admin.controller.js";
const routers = express.Router();

routers.put('/:userId/update-to-teacher', protectedRoute, requireAdmin, specificRoleUser)
export default routers;