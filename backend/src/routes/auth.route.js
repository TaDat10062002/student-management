import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";
import { protectedRoute, requireAdmin } from "../middleware/auth.middleware.js";
const routers = express.Router();

routers.post('/signup', signup);
routers.post('/login', login);
routers.post('/logout', logout);

export default routers