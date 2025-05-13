import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createUser, getUserById, getUsers, updateAccountStatus, updateStudentInfo, updateTeacherInfo, updateUser } from "../controllers/user.controller.js";
const routers = express.Router();

// User routes
routers.get('/', protectedRoute, requireAdmin, getUsers); // admin
routers.post('/:userType/create', protectedRoute, requireAdmin, createUser);  // admin
routers.get('/:id/edit', protectedRoute, requireAdmin, getUserById); // admin
routers.put('/:id/update', protectedRoute, updateUser);  // 3 roles
routers.put('/:id/update-student', protectedRoute, updateStudentInfo);  // 3 roles
routers.put('/:id/update-teacher', protectedRoute, updateTeacherInfo);  // 3 roles
routers.put('/:id/status-account', protectedRoute, updateAccountStatus);  // 3 roles
export default routers;
