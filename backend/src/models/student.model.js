import mongoose, { Schema } from "mongoose";
import User from "./user.model.js";

const studentSchema = new mongoose.Schema({
    age: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    departmentID: {
        type: Schema.Types.ObjectId,
        default: null
    }
})

const Student = User.discriminator("Student", studentSchema);
export default Student;