import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
    course_code: {
        type: String,
        required: true
    },
    teacherID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
    subjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    amount: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;