import mongoose from "mongoose";
import Department from "../models/department.model.js";
export const getDepartments = async (req, res) => {
    const { typeOfDepartment } = req.query;
    try {
        // check differce science of department
        if (typeOfDepartment !== undefined) {
            // soft science
            if (!typeOfDepartment) {
                const departments = await Department.find({ typeOfDepartment: typeOfDepartment });
                res.status(200).json({
                    soft_science_departments: departments
                })
            }
            // hard science
            else {
                const departments = await Department.find({ typeOfDepartment: typeOfDepartment });
                res.status(200).json({
                    soft_science_departments: departments
                })
            }
        }

        const departments = await Department.find();
        if (departments.length === 0) {
            return res.status(404).json({
                message: "No Departments found!!!"
            })
        }

        res.status(200).json({
            departments
        })
    } catch (error) {
        console.log(`Error getDepartments in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createDepartment = async (req, res) => {
    const { name, typeOfDepartment } = req.body;
    try {
        // validate data 
        if (!name || typeOfDepartment) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // check duplicate department
        const department = await Department.findOne({ name: name });
        if (department) {
            return res.status(400).json({
                message: "Department is exist in system!!!"
            })
        }

        const newDepartment = new Department(
            {
                name: name,
                typeOfDepartment: typeOfDepartment
            }
        )
        await newDepartment.save();
        res.status(201).json({
            message: "Department has been created successfully",
        })
    } catch (error) {
        console.log(`Error createDepartment in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, typeOfDepartment } = req.body;
    // check valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID format"
        })
    }

    try {
        if (!name || !typeOfDepartment) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        // find department adn update
        const updatedDepartment = await Department.findByIdAndUpdate(id,
            {
                name: name,
                typeOfDepartment: typeOfDepartment
            },
            { new: true }
        )

        if (!updatedDepartment) {
            return res.status(404).json({
                message: "Department not found!!!"
            })
        }

        res.status(200).json({
            message: "Department has been updated successfully",
            updatedDepartment
        })
    } catch (error) {
        console.log(`Error updateDepartment in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    // check valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID format"
        })
    }

    try {
        // check if department has teacher joined 

        await Department.findByIdAndDelete(id, { new: true });
        res.status(200).json({
            message: "Department has been deleted successfully"
        })
    } catch (error) {
        console.log(`Error updateDepartment in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}