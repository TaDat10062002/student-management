import express from "express";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { createSubject, deleteSubject, getSubjects, updateSubject } from "../controllers/subject.controller.js";
const routers = express.Router();

// Subject routes 
routers.get('/', protectedRoute, getSubjects);  // admin
routers.post('/', protectedRoute, requireAdmin, createSubject);  // admin
routers.put('/:id/edit', protectedRoute, requireAdmin, updateSubject);  // admin
routers.delete('/:id', protectedRoute, requireAdmin, deleteSubject);  // admin
export default routers;