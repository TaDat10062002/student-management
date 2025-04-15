import mongoose, { Mongoose, Schema, Types } from "mongoose";

const teacherSchema = new mongoose.Schema({
    fullName: {
        type: String,
        default: ''
    },

    age: {
        type: String,
        default: ''
    },

    gender: {
        type: String,
        default: ''
    },

    departmentID: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        default: ''
    }
}
    , { timestamps: true }
)

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;