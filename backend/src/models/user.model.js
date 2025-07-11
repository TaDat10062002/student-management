import mongoose from "mongoose";

const options = {
    discriminatorKey: 'role', // trường dùng để phân biệt loại user; bạn có thể đổi tên, mặc định là 
    collection: 'users',     // tên collection chứa tất cả các user
    timestamps: true           // Tự động thêm createdAt, updatedAt
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
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive",
    },
}, options)
const User = mongoose.model("User", userSchema);
export default User;