import mongoose, { Schema } from "mongoose";

const options = {
    discriminatorKey: 'role', // trường dùng để phân biệt loại user; bạn có thể đổi tên, mặc định là 
    collection: 'users'       // tên collection chứa tất cả các user
}
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
        minLength: 6
    }
}, options, { timestamps: true })
const User = mongoose.model("User", userSchema);
export default User;