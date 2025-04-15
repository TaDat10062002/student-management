import { generateToken } from "../lib/utils.js";
import Admin from "../models/admin.model.js";
import Department from "../models/department.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    const { typeOfUser } = req.params;
    try {
        // validate data
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email is already exist"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        if (typeOfUser === "admin") {
            const newUser = new Admin({
                fullName,
                email,
                password: hashedPassword
            })
            generateToken(newUser._id, res)
            await newUser.save()
            return res.status(201).json({
                message: `Created user with ${newUser.role} successfully`
            })
        }
        else if (typeOfUser === "teacher") {
            const newUser = new Teacher({
                fullName,
                email,
                password: hashedPassword
            })
            generateToken(newUser._id, res)
            await newUser.save()
            return res.status(201).json({
                message: `Created user with ${newUser.role} successfully`
            })
        }
        else if (typeOfUser === "student") {
            const newUser = new Student({
                fullName,
                email,
                password: hashedPassword
            })
            generateToken(newUser._id, res)
            await newUser.save()
            return res.status(201).json({
                message: `Created user with ${newUser.role} successfully`
            })
        }
    } catch (error) {
        console.log(`Error createUser in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateUser = async (req, res) => {
    try {

    } catch (error) {

    }
}


export const createDepartment = async (req, res) => {
    const { name } = req.body;
    try {
        const department = await Department.findOne({ name: name });
        if (department) {
            return res.status(400).json({
                message: "Department has already exist"
            })
        }
        const newDepartment = new Department({ name })
        await newDepartment.save();
        res.status(201).json({
            message: `${newDepartment.name} has been created successfully`
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
    try {

    } catch (error) {

    }
}