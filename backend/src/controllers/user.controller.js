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
    const user_per_page = req.query.user_per_page || 3;
    // su dung clone de ko can lap lai query 
    try {
        if (departmentID) {
            // tim dung la tong cong teacher va student
            const queryUser = User.find({
                role: { $in: ['student', 'teacher'] },
                // format lai id
                department: new mongoose.Types.ObjectId(departmentID)
            })

            const users = await queryUser
                .clone()
                .select("fullName email gender role department")
                .skip((page - 1) * user_per_page)
                .limit(user_per_page);

            const totalDocs = (await queryUser).length;
            const totalPages = Math.ceil(totalDocs / user_per_page);

            if (page > totalPages) {
                return res.status(404).json({
                    message: "Page not found!!!"
                })
            }

            return res.status(200).json({
                users,
                pagination: {
                    currentPage: Number(page),
                    totalPages: totalPages,
                    user_per_page: user_per_page,
                    totalUsers: users.length,
                }
            })
        }
        // search fullName email gender role and paginate
        if (search) {
            const queryUser = User.find({
                $or: [
                    { fullName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { gender: { $regex: search, $options: "i" } },
                    { role: { $regex: search, $options: "i" } },
                ]
            })

            const users = await queryUser
                .clone()
                .select("fullName email gender role department")
                .skip((page - 1) * user_per_page)
                .limit(user_per_page);

            const totalDocs = (await queryUser).length;
            const totalPages = Math.ceil(totalDocs / user_per_page);

            if (page > totalPages) {
                return res.status(404).json({
                    message: "Page not found!!!"
                })
            }

            return res.status(200).json({
                users,
                pagination: {
                    currentPage: Number(page),
                    totalPages: totalPages,
                    user_per_page: user_per_page,
                    totalUsers: users.length,
                }
            })
        }

        const queryUser = User.find();
        const users = await queryUser
            .clone()
            .select("fullName email role gender department")
            .skip((page - 1) * user_per_page)
            .limit(user_per_page);

        const totalDocs = (await queryUser).length;
        const totalPages = Math.ceil(totalDocs / user_per_page);

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users was found!!!"
            })
        }

        if (page > totalPages) {
            return res.status(404).json({
                message: "Page not found!!!"
            })
        }

        res.status(200).json({
            users,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                user_per_page: user_per_page,
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
                department: department_id
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
                class: class_id
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
    const { fullName, password, dob, gender, experience, department } = req.body;
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
                { fullName, password, dob, gender, experience },
                { new: true })
            return res.status(200).json({
                message: "Update information successfully",
                updatedUser
            })
        }
        else if (loggedUser.role === 'student') {
            const updatedUser = await Student.findByIdAndUpdate(userID,
                { fullName, password, dob, gender },
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

export const deleteUser = async (req, res) => {
    const { id: userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: "Invalid User ID"
        })
    }
    try {
        const deletedUser = await User.findByIdAndDelete(userId, { new: true });
        if (!deletedUser) {
            return res.status(400).json({
                message: "Delete user failed!!!"
            })
        }
        res.status(200).json({
            message: `Delete user successfully with role is ${deletedUser.role}`
        })
    } catch (error) {
        console.log(`Error deleteUser in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Errors"
        })
    }
}
