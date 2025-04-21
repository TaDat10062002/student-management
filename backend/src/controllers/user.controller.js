import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";
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
                password: hashedPassword
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
