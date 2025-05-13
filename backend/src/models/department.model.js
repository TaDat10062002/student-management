import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    departmentType: {
        type: String,
        enum: ['natural', 'society'],
        default: ''
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive",
    },
}, { timestamps: true });
const Department = mongoose.model("Department", departmentSchema);
export default Department;