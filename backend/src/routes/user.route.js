import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/user.controller.js";
const routers = express.Router();

// User routes
routers.get('/', protectedRoute, requireAdmin, getUsers); // admin
routers.post('/:userType', protectedRoute, requireAdmin, createUser);  // admin
routers.put('/:id/edit', protectedRoute, updateUser);  // 3 roles
routers.delete('/:id', protectedRoute, requireAdmin, deleteUser);  // admin
export default routers;
