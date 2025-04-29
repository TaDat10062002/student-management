import express from "express";
import { getAllTeachers } from "../controllers/teacher.controller.js";
const routers = express.Router();

routers.get('/', getAllTeachers)
export default routers;