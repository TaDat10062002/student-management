import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const teacherSchema = new mongoose.Schema({
    age: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    experience: {
        type: String,
        default: ''
    },
    departmentID: {
        type: Schema.Types.ObjectId,
        default: ''
    }
})

const Teacher = User.discriminator("Teacher", teacherSchema);
export default Teacher;