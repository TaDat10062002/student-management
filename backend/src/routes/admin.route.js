import express from "express";
import { createDepartment, createSubject, updateSubject, createUser, updateDepartment, deleteUser, deleteDepartment, updateUser, deleteSubject, getUsers } from "../controllers/admin.controller.js";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
const routers = express.Router();

// user
routers.get('/users', getUsers);
routers.post('/:createUser', protectedRoute, requireAdmin, createUser);
routers.put('/user/:id/edit', protectedRoute, requireAdmin, updateUser);
routers.delete('/user/:id', protectedRoute, requireAdmin, deleteUser);

// department 
routers.post('/department/', protectedRoute, requireAdmin, createDepartment);
routers.put('/department/:id/edit', protectedRoute, requireAdmin, updateDepartment);
routers.delete('/department/:id', protectedRoute, requireAdmin, deleteDepartment);

// subject
routers.post('/subject/', protectedRoute, requireAdmin, createSubject);
routers.put('/subject/:id/edit', protectedRoute, requireAdmin, updateSubject);
routers.put('/subject/:id/', protectedRoute, requireAdmin, deleteSubject);
export default routers