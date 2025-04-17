import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const studentSchema = new mongoose.Schema({
    dob: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    departmentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        default: null
    }
})

const Student = User.discriminator("student", studentSchema);
export default Student;