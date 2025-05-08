import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// user
export const getUsers = async (req, res) => {
    const search = req.query.search || '';
    const departmentID = req.query.departmentID || null;
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 5;
    const roleUser = req.query.role || '';
    // su dung clone de ko can lap lai query 
    try {
        const filterDepartment = departmentID ?
            {
                role: { $in: ['student', 'teacher'] },
                // format lai id
                department: new mongoose.Types.ObjectId(departmentID)
            } : {};
        const filterPure = search ?
            {
                $or: [
                    { fullName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { gender: { $regex: search, $options: "i" } },
                    { role: { $regex: search, $options: "i" } },
                ]
            } :
            {}
        const filterRole = roleUser ? { role: roleUser } : {};
        const filter = { ...filterPure, ...filterDepartment, ...filterRole };
        const queryUser = User.find(filter);
        const users = await queryUser
            .clone()
            .select("fullName email role gender department status")
            .skip((page - 1) * item_per_page)
            .limit(item_per_page);
        const totalDocs = await User.countDocuments(filter);
        const totalPages = Math.ceil(totalDocs / item_per_page);
        res.status(200).json({
            users,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalUsers: users.length
            }
        })
    } catch (error) {
        console.log(`Error getUsers in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createUser = async (req, res) => {
    const { fullName, email, password, department_id, class_id } = req.body;
    const { userType } = req.params;
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
        if (userType === "admin") {
            const newUser = new Admin({
                fullName,
                email,
                password: hashedPassword
            })
            await newUser.save()
            return res.status(201).json({
                message: `Created user with ${newUser.role} successfully`
            })
        }
        else if (userType === "teacher") {
            const newUser = new Teacher({
                fullName,
                email,
                password: hashedPassword,
                department: new mongoose.Types.ObjectId(department_id)
            })
            await newUser.save()
            return res.status(201).json({
                message: `Created user with ${newUser.role} successfully`
            })
        }
        else if (userType === "student") {
            const newUser = new Student({
                fullName,
                email,
                password: hashedPassword,
                department: new mongoose.Types.ObjectId(department_id),
                class: new mongoose.Types.ObjectId(class_id)
            })
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
    const { id: userID } = req.params;
    const loggedUser = req.user;
    const userId = loggedUser._id.toString();
    const { fullName, dob, gender, experience, department_id, class_id } = req.body;
    try {
        if (userId !== userID) {
            return res.status(403).json({
                message: "You can't update another user information"
            })
        }
        if (loggedUser.role === 'admin') {
            const updatedUser = await Admin.findByIdAndUpdate(userID,
                { fullName, password },
                { new: true })
            return res.status(200).json({
                message: "Update information successfully",
                updatedUser
            })
        }

        else if (loggedUser.role === 'teacher') {
            const updatedUser = await Teacher.findByIdAndUpdate(userID,
                {
                    fullName,
                    dob,
                    gender,
                    experience,
                    department: department_id
                },
                { new: true })
            return res.status(200).json({
                message: "Update information successfully",
                updatedUser
            })
        }
        else if (loggedUser.role === 'student') {
            const updatedUser = await Student.findByIdAndUpdate(userID,
                {
                    fullName,
                    dob,
                    gender,
                    department: department_id,
                    class: class_id
                },
                { new: true }).populate({
                    path: "department",
                    select: "name -_id"
                }).populate({
                    path: "class",
                    select: "name -_id"
                })
            return res.status(200).json({
                message: "Update information successfully",
                updatedUser
            })
        }

    }
    catch (error) {
        console.log(`Error updateUser in controller ${error.message} `);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateAccountStatus = async (req, res) => {
    const { id: userId } = req.params;
    const status = req.body;
    try {
        await User.findByIdAndUpdate(userId, status, { new: true });
        return res.status(200).json({
            message: "Updated in status successfully",
        })
    } catch (error) {
        console.log(`Error updateAccountStatus in controller ${error.message} `);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

