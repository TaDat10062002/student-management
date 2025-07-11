import mongoose, { Schema, Types } from "mongoose";

const registeredCourseSchema = new mongoose.Schema({
    course_code: {
        type: String,
        ref: "Course",
        default: ""
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: ""
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive",
    },
    score: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const RegisteredCourse = mongoose.model("RegisteredCourse", registeredCourseSchema);
export default RegisteredCourse;