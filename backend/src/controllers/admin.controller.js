import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import Department from "../models/department.model.js";
import Student from "../models/student.model.js";
import Subject from "../models/subject.model.js";
import Teacher from "../models/teacher.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// user
export const getUsers = async (req, res) => {
    const role = req.query.role || null;
    const departmentID = req.query.departmentID || null;
    try {
        const users = await User.find().select("-password");
        if (users.length === 0) {
            return res.status(404).json({
                message: "No user was found!!!"
            })
        }

        if (role && departmentID) {
            const users = await User.find({
                role: role,
                departmentID: departmentID
            })
            return res.status(200).json({
                users,
                amount: users.length
            })
        }

        else if (role) {
            const users = await User.find({ role: role });
            return res.status(200).json({
                users,
                amount: users.length
            })
        }

        else if (departmentID) {
            const teachers = await Teacher.find({ departmentID: departmentID });
            const students = await Student.find({ departmentID: departmentID });
            const users = [...teachers, ...students];
            return res.status(200).json({
                users,
                amount: users.length
            })
        }

        else {
            res.status(200).json({
                users,
                amount: users.length
            })
        }


    } catch (error) {
        console.log(`Error getUsers in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    const { createUser } = req.params;
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
        if (createUser === "admin") {
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
        else if (createUser === "teacher") {
            const newUser = new Teacher({
                fullName,
                email,
                password: hashedPassword
            })
            await newUser.save()
            return res.status(201).json({
                message: `Created user with ${newUser.role} successfully`
            })
        }
        else if (createUser === "student") {
            const newUser = new Student({
                fullName,
                email,
                password: hashedPassword
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
    const { fullName, password, dob, gender, experience, departmentID } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(400).json({
            message: "Invalid User ID"
        })
    }
    try {
        const user = await User.findById(userID);
        if (user.role === "Admin") {
            const updatedUser = await Admin.findByIdAndUpdate(userID,
                { fullName, password, dob, gender, experience, departmentID },
                { new: true, runValidators: true });

            res.status(200).json({
                message: `Update user with ${updatedUser.role} role successfully`,
                updatedUser
            })
        }
        else if (user.role === "Teacher") {
            const updatedUser = await Teacher.findByIdAndUpdate(userID,
                { fullName, password, dob, gender, experience, departmentID },
                { new: true, runValidators: true });

            res.status(200).json({
                message: `Update user with ${updatedUser.role} role successfully`,
                updatedUser
            })
        }
        else if (user.role === "Student") {
            const updatedUser = await Student.findByIdAndUpdate(userID,
                { fullName, password, dob, gender, experience, departmentID },
                { new: true, runValidators: true });

            res.status(200).json({
                message: `Update user with ${updatedUser.role} role successfully`,
                updatedUser
            })
        }
    } catch (error) {
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
                message: "Delete user failed"
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

// department 
export const getDepartments = async (req, res) => {
    const type = req.query.type;
    try {
        const departments = await Department.find();
        if (departments.length === 0) {
            return res.status(404).json({
                message: "No department was found!!!"
            })
        }

        res.status(200).json({
            departments,
            amount: departments.length
        })
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
        const department = await Department.findOne({ name: name });
        if (department) {
            return res.status(400).json({
                message: "Department has already exist"
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

        await Department.findByIdAndDelete(departmentID, { new: true });
        res.status(200).json({
            message: `${department.name} deparment has been deleted successfully`
        })

    } catch (error) {

    }
}

// subject 
export const createSubject = async (req, res) => {
    const { name, number_of_credits } = req.body;
    try {
        if (!name || !number_of_credits) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const subject = await Subject.findOne({ name: name });
        if (subject) {
            return res.status(400).json({
                message: `${name} subject is existed`
            })
        }

        const newSubject = new Subject({
            name,
            number_of_credits
        })

        await newSubject.save();
        res.status(201).json({
            message: `Subject ${name} is created successfully`,
            newSubject
        })
    } catch (error) {
        console.log(`Error createSubject in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateSubject = async (req, res) => {
    const { id } = req.params;
    const { name, number_of_credits } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid Subject ID"
        })
    }

    try {
        const updatedSubject = await Subject.findByIdAndUpdate(id,
            {
                name: name,
                number_of_credits: number_of_credits
            }, { new: true })

        if (!updatedSubject) {
            return res.status(404).json({
                message: "Subject not found!!!"
            })
        }

        res.status(200).json({
            message: `Subject ${updatedSubject.name} has been updated successfully`,
            updatedSubject
        })

    } catch (error) {
        console.log(`Error updateSubject in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

// todo
export const deleteSubject = async (req, res) => {

}

