import express from "express";
import { createDepartment, deleteDepartment, getDepartments, updateDepartment } from "../controllers/department.controller.js";
const routers = express.Router();

routers.get('/', getDepartments);
routers.post('/', createDepartment);
routers.put('/:id/edit', updateDepartment);
routers.delete('/:id', deleteDepartment);

export default routers;
