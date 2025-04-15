import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: String,
        default: '0'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        default: null
    }
}, { timestamps: true })
const User = mongoose.model("User", userSchema);
export default User;