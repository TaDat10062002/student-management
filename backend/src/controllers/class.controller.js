import mongoose from "mongoose";
import ClassRoom from "../models/class.model.js";
import Student from "../models/student.model.js";
import Course from "../models/course.model.js";

export const getClass = async (req, res) => {
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 5;
    try {
        const filter = search ? {
            name: {
                $regex: search
            }
        } : {};
        const queryClassrom = ClassRoom.find(filter).select("name amount");
        const [totalDocs, classrooms] = await Promise.all([
            ClassRoom.countDocuments(filter),
            await queryClassrom.clone().skip((page - 1) * item_per_page).limit(item_per_page),
        ])
        const totalPages = Math.ceil(totalDocs / item_per_page);
        return res.status(200).json({
            classrooms,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalClasses: classrooms.length
            }
        })
    } catch (error) {
        console.log(`Error getClass in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getStudentByClass = async (req, res) => {
    const { id: classID } = req.params;
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 5;
    const classroom = await ClassRoom.findById(classID).select("name -_id");
    try {
        const filter = search ?
            {
                role: 'student',
                class: classID,
                $or: [
                    {
                        fullName: { $regex: search, $options: "i" }
                    },
                    {
                        email: { $regex: search, $options: "i" }
                    }
                ]
            }
            :
            {
                role: 'student',
                class: classID,
            };
        const queryStudentByClass = Student.find(filter);
        const students = await queryStudentByClass.clone().select("fullName email dob gender").populate({
            path: "class",
            select: "name -_id"
        }).skip((page - 1) * item_per_page).limit(item_per_page);
        const totalDocs = await Student.countDocuments(filter);
        const totalPages = Math.ceil(totalDocs / item_per_page);
        return res.status(200).json({
            students,
            classroom,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalStudent: students.length
            }
        })
    } catch (error) {
        console.log(`Error getStudentByClass ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createClass = async (req, res) => {
    const { name, amount } = req.body;
    try {
        if (!name || !amount) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const classRoom = await ClassRoom.findOne({ name: name });
        if (classRoom) {
            return res.status(400).json({
                message: "Class already exists"
            })
        }

        const newClassRoom = new ClassRoom({
            name,
            amount
        });

        await newClassRoom.save();
        return res.status(201).json({
            message: "Created class successfully",
            newClassRoom
        })
    } catch (error) {
        console.log(`Error createClass in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getClassById = async (req, res) => {
    const { id } = req.params;
    try {
        const classroom = await ClassRoom.findById(id);
        if (!classroom) {
            return res.status(404).json({
                message: "Class was not found!!!"
            })
        }
        res.status(200).json({
            classroom
        })
    } catch (error) {
        console.log(`Error getClassById in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateClass = async (req, res) => {
    const { id } = req.params;
    const { name, amount } = req.body;
    try {
        if (!name || !amount) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const updatedClassroom = await ClassRoom.findByIdAndUpdate(id, {
            name,
            amount
        }, { new: true })

        if (!updatedClassroom) {
            return res.status(400).json({
                message: "Can't update class information"
            })
        }

        res.status(200).json({
            message: "Update class info successfully",
            updatedClassroom
        })
    } catch (error) {
        console.log(`Error updateClass in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}