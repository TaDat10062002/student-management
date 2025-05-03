import mongoose from "mongoose";
import { generateCourseCode } from "../lib/utils.js";
import Course from "../models/course.model.js";
import Teacher from "../models/teacher.model.js";
import Subject from "../models/subject.model.js";
import RegisteredCourse from "../models/registered_course.model.js";

export const getAllCourse = async (req, res) => {
    const search = req.query.search || '';
    const page = req.query.page || 1;
    const item_per_page = req.query.item_per_page || 3;
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
                    _id: 0,
                    code: 1,
                    amount: 1,
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

        getCourseLimit()
        const courses = await Course.aggregate(pipeline);
        const paginatePipeline = [...pipeline];
        paginatePipeline.push({ $skip: (page - 1) * item_per_page }, { $limit: Number(item_per_page) });
        const coursesPaginate = await Course.aggregate(paginatePipeline);
        const totalDocs = courses.length;
        const totalPages = Math.ceil(totalDocs / item_per_page);

        if (page > totalPages) {
            return res.status(404).json({
                message: "Page not found!!!!"
            })
        }

        const studentOfCourse = await getCourseLimit();
        // pagination later
        return res.status(200).json({
            courses: coursesPaginate,
            studentOfCourse,
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

export const getCourseLimit = async () => {
    try {
        const courses = await Course.find().sort({ code: 1 });
        const studentOfCourse = {};
        for (const course of courses) {
            const count = await RegisteredCourse.find().sort({ code: 1 }).countDocuments({ course_code: course.code });
            studentOfCourse[course.code] = count;
        }
        return studentOfCourse;
    } catch (error) {

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
            teacher: teacherID,
            subject: subjectID
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
