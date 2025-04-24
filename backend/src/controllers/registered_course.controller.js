import mongoose from "mongoose";
import Course from "../models/course.model.js";
import RegisteredCourse from "../models/registered_course.model.js";
import Subject from "../models/subject.model.js";

export const getAllRegisteredCourse = async (req, res) => {
    const user = req.user;
    const studentId = user._id;
    const page = req.query.page || 1;
    const registeredCourse_per_page = req.query.registeredCourse_per_page || 3;
    try {
        // view only that student registeredCourses
        const pipeline = [
            {
                $match: { studentId: studentId }
            },
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
                    "teacherInfo.email": 1,
                    "subjectInfo.name": 1,
                    "subjectInfo.number_of_credits": 1,
                    _id: 0,
                    status: 1,
                    score: 1,
                }
            }
        ]
        const registeredCourses = await RegisteredCourse.aggregate(pipeline);
        const paginatePipeline = [...pipeline];
        paginatePipeline.push(
            { $skip: (page - 1) * registeredCourse_per_page },
            { $limit: Number(registeredCourse_per_page) })
        const registeredCoursePaginate = await RegisteredCourse.aggregate(paginatePipeline);
        const totalDocs = registeredCourses.length;
        const totalPages = Math.ceil(totalDocs / registeredCourse_per_page);

        if (page > totalPages) {
            return res.status(404).json({
                message: "Page not found!!!"
            })
        }

        return res.status(200).json({
            registeredCoursePaginate,
            pagination: {
                currentPage: Number(page),
                totalPages: totalPages,
                registeredCourse_per_page: Number(registeredCourse_per_page),
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

export const updateScore = async (req, res) => {
    const { id: registeredCourseId } = req.params;
    const { score } = req.body;
    if (!mongoose.Types.ObjectId.isValid(registeredCourseId)) {
        return res.status(400).json({
            message: "Invalid Object ID"
        })
    }
    try {
        const registeredCourse = await RegisteredCourse.findById(registeredCourseId);
        if (!registeredCourse) {
            return res.status(404).json({
                message: "Registered Course ID not found!!!"
            })
        }

        if (score < 0 || score > 10) {
            return res.status(400).json({
                message: "score range 1 - 10"
            })
        }

        const updatedScore = await RegisteredCourse.findByIdAndUpdate(registeredCourseId, {
            score
        }, { new: true })

        return res.status(200).json({
            message: `Update score is ${updatedScore.score}`,
            updatedScore
        })
    } catch (error) {
        console.log(`Error updateScore in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const registerCourse = async (req, res) => {
    const { id: course_code } = req.params;
    const user = req.user;
    const studentId = user._id;
    try {
        // check id course exist
        const course = await Course.findOne({ course_code: course_code });
        if (!course) {
            return res.status(404).json({
                message: "Course not found!!!. Please make sure your course information"
            })
        }

        const count = await RegisteredCourse.countDocuments({
            course_code: course_code
        })

        if (count === Number(course.amount)) {
            return res.status(400).json({
                message: "This course is full right now!!!. Please register the others"
            })
        }

        // check any student register this course yet
        const isRegisteredCourse = await RegisteredCourse.findOne({ course_code: course_code, studentId: studentId });
        if (isRegisteredCourse) {
            return res.status(400).json({
                message: "Student has registered this course before"
            })
        }

        // check course existing
        let registeredCourses = [];
        const existedCourse = await RegisteredCourse.findOne({ course_code: course_code });
        // no, then create the new one
        if (!existedCourse) {
            const registeredCourse = new RegisteredCourse({
                course_code,
                studentId
            })
            registeredCourses.push(registeredCourse);
            await RegisteredCourse.insertMany(registeredCourse);
            return res.status(201).json({
                message: "Student register course successfully",
                registeredCourses
            })
        }
        // continue push it into an array
        registeredCourses = await RegisteredCourse.find({ course_code: course_code });
        const registeredCourse = new RegisteredCourse({
            course_code,
            studentId
        })
        registeredCourses.push(registeredCourse);
        await RegisteredCourse.insertMany(registeredCourse);
        return res.status(201).json({
            message: "Student register course successfully",
            registeredCourses
        })
    } catch (error) {
        console.log(`Error registerCourse in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const cancelRegisteredCourse = async (req, res) => {
    const { id: registerCourseId } = req.params;
    const user = req.user;
    try {
        const registeredCourse = await RegisteredCourse.findById(registerCourseId);
        const course = await Course.findOne({ course_code: registeredCourse.course_code });
        const subject = await Subject.findById(course.subjectID);
        const userId = user._id.toString();
        const studentId = registeredCourse.studentId.toString();
        // check that userId and studentId was the same person
        if (userId !== studentId) {
            return res.status(403).json({
                message: "You can't delete others Student's course"
            })
        }
        await RegisteredCourse.findByIdAndDelete(registerCourseId, { new: true });
        res.status(200).json({
            message: `${user.fullName} has canceled course ${subject.name} successfully`
        })
    } catch (error) {
        console.log(`Error cancelRegisteredCourse in controller ${error.message}`);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}