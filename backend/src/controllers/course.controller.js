import mongoose from "mongoose";
import { generateCourseCode } from "../lib/utils.js";
import Course from "../models/course.model.js";
import Teacher from "../models/teacher.model.js";
import Subject from "../models/subject.model.js";
import RegisteredCourse from "../models/registered_course.model.js";

export const getAllCourse = async (req, res) => {
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 5;
    try {
        const pipeline = [
            // teacher
            {
                // nhu populate
                $lookup: {
                    from: "users",
                    localField: "teacher",
                    foreignField: "_id",
                    as: "teacherInfo"
                }
            },
            { $unwind: '$teacherInfo' },

            // subject
            {
                $lookup: {
                    from: "subjects",
                    localField: "subject",
                    foreignField: "_id",
                    as: "subjectInfo"
                }
            },
            { $unwind: '$subjectInfo' },
            {
                // 1 la show 0 la hide
                $project: {
                    _id: 1,
                    code: 1,
                    amount: 1,
                    status: 1,
                    'teacherInfo.fullName': 1,
                    'subjectInfo.name': 1,
                    'subjectInfo.number_of_credits': 1,
                }
            },
            {
                // tim kiem nhu find
                $match: {
                    $or: [
                        { 'teacherInfo.fullName': { $regex: search, $options: "i" } },
                        { 'subjectInfo.name': { $regex: search, $options: "i" } }
                    ]
                }
            }
        ]
        const courses = await Course.aggregate(pipeline);
        const paginatePipeline = [...pipeline];
        paginatePipeline.push({ $skip: (page - 1) * item_per_page }, { $limit: Number(item_per_page) });
        const coursesPaginate = await Course.aggregate(paginatePipeline);
        const totalDocs = courses.length;
        const totalPages = Math.ceil(totalDocs / item_per_page);
        // pagination later
        return res.status(200).json({
            courses: coursesPaginate,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalCourse: courses.length
            }
        })

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
            code: course_code,
            teacher: teacherID,
            subject: subjectID,
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

export const getCourseById = async (req, res) => {
    const { id: courseId } = req.params;
    try {
        const course = await Course.findById(courseId)
            .populate({
                path: "teacher",
                select: "fullName"
            })
            .populate({
                path: "subject",
                select: "name"
            })
        if (!course) {
            return res.status(400).json({
                message: "Department not found!!!"
            })
        }
        res.status(200).json({
            course
        })
    } catch (error) {
        console.log(`Error getCourseById in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateCourse = async (req, res) => {
    const { id: courseId } = req.params;
    const { teacher, subject, amount } = req.body;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(400).json({
            message: "Invalid Course ID"
        })
    }
    try {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, { teacher, subject, amount }, { new: true })
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
    const { id: courseCode } = req.params;
    try {

        const count = await RegisteredCourse.countDocuments({ course_code: courseCode })
        if (count > 0) {
            return res.status(400).json({
                message: `Cannot delete this course, It has ${count} students register it`
            })

        }

        const course = await Course.findOne({ code: courseCode });
        const courseId = course._id;
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

export const getTeacherCourses = async (req, res) => {
    const teacherId = req.user._id;
    const item_per_page = req.query.item_per_page || 3;
    const page = req.query.page || 1;
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "teacher",
                    foreignField: "_id",
                    as: "teacherInfo",
                }
            },
            { $unwind: "$teacherInfo" },
            {
                $lookup: {
                    from: "subjects",
                    localField: "subject",
                    foreignField: "_id",
                    as: "subjectInfo",
                }
            },
            { $unwind: "$subjectInfo" },
            {
                $project: {
                    'teacherInfo._id': 1,
                    'teacherInfo.fullName': 1,
                    'subjectInfo.name': 1,
                    'subjectInfo.number_of_credits': 1,
                    code: 1,
                }
            },
            {
                $match: {
                    "teacherInfo._id": teacherId
                }
            }
        ]
        const teacherCourses = await Course.aggregate(pipeline);
        const totalDocs = teacherCourses.length;
        const totalPages = Math.ceil(totalDocs / item_per_page);
        const paginatePipeline = [...pipeline];
        paginatePipeline.push(
            {
                $skip: (page - 1) * item_per_page
            },
            {
                $limit: item_per_page
            }
        )
        const tearcherCoursesPaginate = await Course.aggregate(paginatePipeline)
        return res.status(200).json({
            teacherCourses: tearcherCoursesPaginate,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalCourses: teacherCourses.length
            }
        })
    } catch (error) {
        console.log(`Error getTeacherCourses in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const getStudentInTeacherCourse = async (req, res) => {
    const { id: course_code } = req.params;
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 3;
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "studentId",
                    foreignField: "_id",
                    as: "studentInfo"
                }
            },
            { $unwind: "$studentInfo" },
            {
                $lookup: {
                    from: "departments",
                    localField: "studentInfo.department",
                    foreignField: "_id",
                    as: "departmentInfo"
                }
            },
            { $unwind: "$departmentInfo" },
            {
                $lookup: {
                    from: "classrooms",
                    localField: "studentInfo.class",
                    foreignField: "_id",
                    as: "classInfo"
                }
            },
            { $unwind: "$classInfo" },
            {
                $lookup: {
                    from: "courses",
                    localField: "course_code",
                    foreignField: "code",
                    as: "coursesInfo"
                }
            },
            { $unwind: "$coursesInfo" },
            {
                $lookup: {
                    from: "courses",
                    localField: "course_code",
                    foreignField: "code",
                    as: "courseInfo"
                }
            },
            { $unwind: "$courseInfo" },
            {
                $lookup: {
                    from: "subjects",
                    localField: "courseInfo.subject",
                    foreignField: "_id",
                    as: "subjectInfo"
                }
            },
            { $unwind: "$subjectInfo" },
            {
                $project: {
                    course_code: 1,
                    _id: 1,
                    score: 1,
                    "studentInfo.fullName": 1,
                    "studentInfo.email": 1,
                    "studentInfo.gender": 1,
                    "departmentInfo.name": 1,
                    "classInfo.name": 1,
                    "courseInfo.subject": 1,
                    "subjectInfo.name": 1,
                }
            },
            {
                $match: { course_code: course_code }
            }
        ];
        const students = await RegisteredCourse.aggregate(pipeline);
        const paginatePipeLine = [...pipeline];
        paginatePipeLine.push(
            { $skip: (page - 1) * item_per_page },
            { $limit: item_per_page },
        )
        const studentsPaginate = await RegisteredCourse.aggregate(paginatePipeLine);
        const totalDocs = students.length;
        const totalPages = Math.ceil(totalDocs / item_per_page);

        return res.status(200).json({
            students: studentsPaginate,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                item_per_page: item_per_page,
                totalStudents: students.length
            }
        })

    } catch (error) {
        console.log(`Error getStudentInTeacherCourse in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateCourseStatus = async (req, res) => {
    const { id: courseId } = req.params;
    const status = req.body;
    try {
        await Course.findByIdAndUpdate(courseId, status, { new: true });
        return res.status(200).json({
            message: "Updated in status successfully",
        })
    } catch (error) {
        console.log(`Error updateCourseStatus in controller ${error.message} `);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

