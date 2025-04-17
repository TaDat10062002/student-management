import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const teacherSchema = new mongoose.Schema({
    dob: {
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
        ref: "Department",
        default: null
    }
})
const Teacher = User.discriminator("teacher", teacherSchema);
export default Teacher;