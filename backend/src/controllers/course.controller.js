import mongoose from "mongoose";
import { generateCourseCode } from "../lib/utils.js";
import Course from "../models/course.model.js";
import Teacher from "../models/teacher.model.js";
import Subject from "../models/subject.model.js";
import User from "../models/user.model.js";

export const getAllCourse = async (req, res) => {
    try {

    } catch (error) {
        console.log(`Error getAllCourse in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const createCourse = async (req, res) => {
    const { teacherID, subjectID, amount } = req.body;
    try {
        const course = await Course.findOne().sort({ createdAt: -1 });
        const course_code = generateCourseCode(course);
        const teacher = await Teacher.findById(new mongoose.Types.ObjectId(teacherID));
        const subject = await Subject.findById(new mongoose.Types.ObjectId(subjectID));
        // check course exist
        const existedCourse = await Course.findOne({
            teacherID: teacherID,
            subjectID: subjectID
        });
        if (existedCourse) {
            return res.status(400).json({
                message: "This course already exists. Create another one!!!"
            })
        }
        if (!teacher || !subject) {
            return res.status(404).json({
                message: "Teacher or Subject were not found!!!"
            })
        }
        if (!teacher && !subject) {
            return res.status(404).json({
                message: "Teacher and Subject were not found!!!"
            })
        }
        const newCourse = new Course({
            course_code: course_code,
            teacherID: teacherID,
            subjectID: subjectID,
            amount: amount
        })
        await newCourse.save();
        return res.status(201).json({
            message: "Course has been created successfully",
            newCourse
        })
    } catch (error) {
        console.log(`Error createCourse in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateCourse = async (req, res) => {
    const { id: courseId } = req.params;
    const { teacherID, subjectID, amount } = req.body;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({
            message: "Invalid Course ID"
        })
    }
    try {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { teacherID, subjectID, amount }, { new: true })
        res.status(200).json({
            message: "Course has been updated successfully",
            updatedCourse
        })
    } catch (error) {
        console.log(`Error updateCourse in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const deleteCourse = async (req, res) => {
    const { id: courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({
            message: "Invalid Course ID"
        })
    }
    try {
        await Course.findByIdAndDelete(courseId, { new: true })
        return res.status(200).json({
            message: "This course has been deleted successfully",
        })
    } catch (error) {
        console.log(`Error deleteCourse in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}