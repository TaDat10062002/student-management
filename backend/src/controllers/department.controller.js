import mongoose from "mongoose";
import Department from "../models/department.model.js";
import User from "../models/user.model.js";

// department 
export const getDepartments = async (req, res) => {
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 3;
    try {
        const departments = await Department.find();
        if (departments.length === 0) {
            return res.status(404).json({
                message: "No department was found!!!"
            })
        }
        // paginate 
        const totalDocs = departments.length;
        const totalPages = Math.ceil(totalDocs / item_per_page);
        // check current page > totalPages 
        if (page > totalPages) {
            return res.status(404).json({
                message: "Page not found!!!"
            })
        }
        // search 
        // (page - 1) * item_per_page tru truong hop item bi lo 
        // vi du trang 1 { 1, 2 } trang 2{ 2, 3 } => trang 1 { 1, 2 } trang 2{ 3 }
        const rs = await Department.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { departmentType: { $regex: search, $options: "i" } },
            ]
        }).skip((page - 1) * item_per_page).limit(item_per_page);

        return res.status(200).json({
            departments: rs,
            pagination: {
                page: Number(page),
                totalPages: totalPages,
                amount: rs.length
            }
        });
    } catch (error) {
        console.log(`Error getDepartment in controller ${error.message}`);
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

export const deleteDepartment = async (req, res) => {
    const { id: departmentID } = req.params;
    if (!mongoose.Types.ObjectId.isValid(departmentID)) {
        return res.status(400).json({
            message: "Invalid Department ID"
        })
    }
    try {
        const department = await Department.findById(departmentID);
        const count = await User.countDocuments({
            departmentID: department._id
        })
        if (count > 0) {
            return res.status(400).json({
                message: `Cannot delete ${department.name}. There are ${count} person belong to this department`
            })
        }
        await Department.findByIdAndDelete(departmentID);
        res.status(200).json({
            message: `${department.name} deparment has been deleted successfully`
        })
    } catch (error) {
        console.log(`Error deleteDepartment in controller ${error.message}`);
        req.status(500).json({
            message: "Internal Server Error"
        })
    }
}
