import express from "express";
import { createUser } from "../controllers/admin.controller.js";
const routers = express.Router();

routers.post('/create-user/:typeOfUser', createUser)

export default routers