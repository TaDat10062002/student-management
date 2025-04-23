import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
    course_code: {
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject"
    },
    amount: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department"
    }
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;