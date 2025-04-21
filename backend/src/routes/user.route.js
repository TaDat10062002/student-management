import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/user.controller.js";
const routers = express.Router();

// User routes
routers.get('/', protectedRoute, requireAdmin, getUsers);
routers.post('/:userType', protectedRoute, requireAdmin, createUser);
routers.put('/:id/edit', protectedRoute, requireAdmin, updateUser);
routers.delete('/:id', protectedRoute, requireAdmin, deleteUser);
export default routers;
