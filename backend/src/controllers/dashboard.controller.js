import User from "../models/user.model.js";
import Department from "../models/department.model.js";
import ClassRoom from "../models/class.model.js";
import Subject from "../models/subject.model.js";
import Course from "../models/course.model.js";
import RegisteredCourse from "../models/registered_course.model.js";
import Teacher from "../models/teacher.model.js";

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

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().select("fullName");
        res.status(200).json({ teachers })
    } catch (error) {
        console.log(`Error getTeacher in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().select("name");
        res.status(200).json({ subjects })
    } catch (error) {
        console.log(`Error getTeacher in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getAllRegisterCourses = async (req, res) => {
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 5;
    try {
        // view only that student registeredCourses
        const pipeline = [
            // lookup course
            {
                $lookup: {
                    from: "courses",
                    localField: "course_code",
                    foreignField: "code",
                    as: "courseInfo"
                }
            },
            { $unwind: '$courseInfo' },
            // lookup teacher 
            {
                $lookup: {
                    from: "users",
                    localField: "courseInfo.teacher",
                    foreignField: "_id",
                    as: "teacherInfo"
                }
            },
            { $unwind: '$teacherInfo' },
            // lookup subject 
            {
                $lookup: {
                    from: "subjects",
                    localField: "courseInfo.subject",
                    foreignField: "_id",
                    as: "subjectInfo"
                }
            },
            { $unwind: '$subjectInfo' },
            {
                $project: {
                    "courseInfo.code": 1,
                    "courseInfo.amount": 1,
                    "teacherInfo.fullName": 1,
                    "subjectInfo.name": 1,
                    "subjectInfo.number_of_credits": 1,
                    _id: 1,
                    status: 1,
                }
            },
            { $sort: { "courseInfo.code": 1 } },
            {
                $match: {
                    $or: [
                        { "teacherInfo.fullName": { $regex: search, $options: "i" } },
                        { "subjectInfo.name": { $regex: search, $options: "i" } },
                    ]
                }
            }
        ]
        const registeredCourses = await RegisteredCourse.aggregate(pipeline);
        const paginatePipeline = [...pipeline];
        paginatePipeline.push(
            { $skip: (page - 1) * item_per_page },
            { $limit: Number(item_per_page) })
        const registeredCoursePaginate = await RegisteredCourse.aggregate(paginatePipeline);
        const totalDocs = registeredCourses.length;
        const totalPages = Math.ceil(totalDocs / item_per_page);
        return res.status(200).json({
            registeredCourses: registeredCoursePaginate,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: Number(item_per_page),
                totalRegisteredCourse: registeredCoursePaginate.length
            }
        })
    } catch (error) {
        console.log(`Error getAllRegisteredCourse in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
