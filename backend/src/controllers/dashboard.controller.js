import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import ClassRoom from "../models/class.model.js";
import Subject from "../models/subject.model.js";
import Course from "../models/course.model.js";
import RegisteredCourse from "../models/registered_course.model.js";

export const getDashBoardStatistic = async (req, res) => {
    try {
        const totalUsers = await User.find();
        const totalDepartments = await Department.find();
        const totalClassrooms = await ClassRoom.find();
        const totalSubjects = await Subject.find();
        const totalCourses = await Course.find();
        const totalRegisteredCourses = await RegisteredCourse.find();
        const totalStatistic = {
            totalUsers: totalUsers.length,
            totalDepartments: totalDepartments.length,
            totalClassrooms: totalClassrooms.length,
            totalSubjects: totalSubjects.length,
            totalCourses: totalCourses.length,
            totalRegisteredCourses: totalRegisteredCourses.length
        }

        res.status(200).json({
            totalStatistic: totalStatistic
        })
    } catch (error) {
        console.log(`Error getDashBoardStatistic in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ departments })
    } catch (error) {
        console.log(`Error getDepartments in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getClassrooms = async (req, res) => {
    try {
        const classrooms = await ClassRoom.find();
        res.status(200).json({ classrooms })
    } catch (error) {
        console.log(`Error getDepartments in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}