import express from "express";
import { createDepartment, createSubject, updateSubject, createUser, updateDepartment, updateUser } from "../controllers/admin.controller.js";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
const routers = express.Router();

routers.post('/user/:typeOfUser', protectedRoute, requireAdmin, createUser);
routers.put('/:id/update-user', protectedRoute, requireAdmin, updateUser);
// routers.delete('/:id', protectedRoute, requireAdmin, deleteUser);

// department 
routers.post('/department/', protectedRoute, requireAdmin, createDepartment);
routers.put('/department/:id/edit', protectedRoute, requireAdmin, updateDepartment);
// routers.delete('/:id', protectedRoute, requireAdmin, deleteDepartment);

// subject
routers.post('/subject/', protectedRoute, requireAdmin, createSubject);
routers.post('/subject/:id/edit', protectedRoute, requireAdmin, updateSubject);
export default routers