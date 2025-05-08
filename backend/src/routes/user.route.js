import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createUser, getUsers, updateAccountStatus, updateUser } from "../controllers/user.controller.js";
const routers = express.Router();

// User routes
routers.get('/', protectedRoute, requireAdmin, getUsers); // admin
routers.post('/:userType/create', protectedRoute, requireAdmin, createUser);  // admin
routers.put('/:id/edit', protectedRoute, updateUser);  // 3 roles
routers.put('/:id/status-account', protectedRoute, updateAccountStatus);  // 3 roles
export default routers;
