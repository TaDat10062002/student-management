import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createSubject, deleteSubject, getSubjects, updateSubject } from "../controllers/subject.controller.js";
const routers = express.Router();

// Subject routes 
routers.get('/', protectedRoute, getSubjects);
routers.post('/', protectedRoute, requireAdmin, createSubject);
routers.put('/:id/edit', protectedRoute, requireAdmin, updateSubject);
routers.delete('/:id', protectedRoute, requireAdmin, deleteSubject);
export default routers;