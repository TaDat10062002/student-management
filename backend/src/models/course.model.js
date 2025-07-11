import mongoose, { Schema } from "mongoose";

const courseSchema = new mongoose.Schema({
    code: {
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
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive",
    },
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;