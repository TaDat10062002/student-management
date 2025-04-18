import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    departmentType: {
        type: String,
        enum: ['Natural', 'Society'],
        required: true
    }
}, { timestamps: true });
const Department = mongoose.model("Department", departmentSchema);
export default Department;