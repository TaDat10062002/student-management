import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createSubject, deleteSubject, getSubjectById, getSubjects, updateSubject } from "../controllers/subject.controller.js";
const routers = express.Router();

// Subject routes 
routers.get('/', protectedRoute, getSubjects);
routers.post('/', protectedRoute, requireAdmin, createSubject);  // admin
routers.get('/:id/edit', protectedRoute, requireAdmin, getSubjectById);  // admin
routers.put('/:id/update', protectedRoute, requireAdmin, updateSubject);  // admin
routers.delete('/:id', protectedRoute, requireAdmin, deleteSubject);  // admin
export default routers;