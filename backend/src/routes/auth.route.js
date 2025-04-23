import express from "express";
import { checkAuth, login, logout } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const routers = express.Router();

// Auth routes - 3 roles
routers.post('/login', login);
routers.post('/logout', logout);
routers.get('/check', protectedRoute, checkAuth);
export default routers;