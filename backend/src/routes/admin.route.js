import express from "express";
import { createDepartment, createUser } from "../controllers/admin.controller.js";
const routers = express.Router();

routers.post('/create-user/:typeOfUser', createUser);
export default routers