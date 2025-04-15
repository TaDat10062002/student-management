import express from "express";
import { login, logout } from "../controllers/auth.controller.js";

const routers = express.Router();

routers.post('/login', login);
routers.post('/logout', logout);
export default routers;