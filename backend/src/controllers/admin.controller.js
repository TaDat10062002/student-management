import { generateToken } from "../lib/utils.js";
import Admin from "../models/admin.model.js";
import Department from "../models/department.model.js";
import Student from "../models/student.model.js";
import Subject from "../models/subject.model.js";
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

export const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { fullName, password, role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            fullName: fullName,
            password: password,
            role: role
        }, { overwriteDiscriminatorKey: true, new: true })

        if (!updatedUser) {
            return res.status(400).json({
                message: "Update Admin failed"
            })
        }

        res.status(200).json({
            message: "Update Admin successfully",
            updatedUser
        })

    } catch (error) {
        console.log(`Error updateTeacher in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { fullName, password, role, gender, experience, departmentID, dob } = req.body;
    try {
        // phai chon user vi no co cai key role
        const updatedUser = await User.findByIdAndUpdate(id, {
            fullName: fullName,
            password: password,
            role: role,
            gender: gender,
            experience: `${experience} years`,
            departmentID: departmentID,
            dob: dob,
        }, { overwriteDiscriminatorKey: true, new: true })

        if (!updatedUser) {
            return res.status(400).json({
                message: "Updated teacher failed",
            })
        }

        return res.status(200).json({
            message: "Update teacher successfully",
            updatedUser
        })

    } catch (error) {
        console.log(`Error updateTeacher in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { fullName, password, role, gender, departmentID, dob } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            fullName: fullName,
            password: password,
            role: role,
            gender: gender,
            departmentID: departmentID,
            dob
        }, { overwriteDiscriminatorKey: true, new: true })

        if (!updatedUser) {
            return res.status(400).json({
                message: "Update student failed"
            })
        }

        res.status(200).json({
            message: "Update student successfully",
            updatedUser
        })

    } catch (error) {
        console.log(`Error updateStudent in controller ${error.message}`);
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
    const { id } = req.params;
    const { name, departmentType } = req.body;
    try {
        const upadatedDepartment = await Department.findByIdAndUpdate(id, {
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

// todo
export const deleteDepartment = async (req, res) => {

}

export const createSubject = async (req, res) => {
    const { name, number_of_credits } = req.body;
    try {
        if (!name || !number_of_credits) {
            return res.startus(400).json({
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
    try {
        const updatedSubject = await Subject.findByIdAndUpdate(id,
            {
                name: name,
                number_of_credits: number_of_credits
            }, { new: true })

        if (updatedSubject.errors === undefined) {
            return res.status(404).json({
                message: "Subject not found"
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
