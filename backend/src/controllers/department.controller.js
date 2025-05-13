import mongoose from "mongoose";
import Department from "../models/department.model.js";
import User from "../models/user.model.js";
import Teacher from "../models/teacher.model.js";
// department 
export const getDepartments = async (req, res) => {
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 3;
    try {
        const filter = search ?
            {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { departmentType: { $regex: search, $options: "i" } }
                ]
            } : {};
        const queryDepartment = Department.find(filter);
        const departments = await queryDepartment
            .clone()
            .select("name departmentType status")
            .skip((page - 1) * item_per_page)
            .limit(item_per_page);
        const totalDocs = await Department.countDocuments(filter);
        const totalPages = Math.ceil(totalDocs / item_per_page);
        return res.status(200).json({
            departments,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalDepartments: departments.length
            }
        })
    } catch (error) {
        console.log(`Error getDepartment in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getTeachersByDepartment = async (req, res) => {
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 5;
    const { id: departmentId } = req.params;
    try {
        const filter = search ?
            {
                role: "teacher",
                department: departmentId,
                $or: [
                    { fullName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { gender: { $regex: search, $options: "i" } },
                    { experience: { $regex: search, $options: "i" } },
                ]
            } :
            {
                role: "teacher",
                department: departmentId
            };
        const queryTeacherByDepartment = Teacher.find(filter)
        const totalDocs = await Teacher.countDocuments(filter);
        const totalPages = Math.ceil(totalDocs / item_per_page);
        const teachers = await queryTeacherByDepartment
            .clone()
            .select("fullName email role dob gender experience -_id")
            .skip((page - 1) * item_per_page)
            .limit(item_per_page);
        return res.status(200).json({
            teachers,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalTeachers: teachers.length
            }
        })
    } catch (error) {
        console.log(`Error getTeachersByDepartment in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getDepartmentById = async (req, res) => {
    const { id: departmentID } = req.params;
    try {
        const department = await Department.findById(departmentID);
        if (!department) {
            return res.status(400).json({
                message: "Department not found!!!"
            })
        }
        res.status(200).json({
            department
        })
    } catch (error) {
        console.log(`Error getDepartmentById in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createDepartment = async (req, res) => {
    const { name, departmentType } = req.body;
    try {
        if (!name || !departmentType) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const department = await Department.findOne({ name: name });
        if (department) {
            return res.status(400).json({
                message: "Department already exists"
            })
        }
        const newDepartment = new Department({ name, departmentType })
        await newDepartment.save();
        res.status(201).json({
            message: `${newDepartment.name} department has been created successfully`
        })
    } catch (error) {
        console.log(`Error createDepartment in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateDepartment = async (req, res) => {
    const { id: departmentID } = req.params;
    const { name, departmentType } = req.body;
    if (!mongoose.Types.ObjectId.isValid(departmentID)) {
        return res.status(400).json({
            message: "Invalid User ID"
        })
    }
    try {

        if (!name || !departmentType) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const upadatedDepartment = await Department.findByIdAndUpdate(departmentID, {
            name,
            departmentType
        }, { new: true }).select(["-createdAt", "-updatedAt"]);

        if (!upadatedDepartment) {
            return res.startus(400).json({
                message: "Update department failed!!!"
            })
        }
        res.status(200).json({
            message: `Update department successfully`,
            upadatedDepartment
        })
    } catch (error) {
        console.log(`Error updateDepartment in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateDepartmentStatus = async (req, res) => {
    const { id: departmentID } = req.params;
    const status = req.body;
    try {
        await Department.findByIdAndUpdate(departmentID, status, { new: true });
        return res.status(200).json({
            message: "Updated in status successfully",
        })
    } catch (error) {
        console.log(`Error updateDepartmentStatus in controller ${error.message} `);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

