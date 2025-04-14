import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    typeOfDepartment: {
        type: Boolean,
        required: true,
        default: null
    }
},
    { timestamps: true }
)

const Department = mongoose.model("Department", departmentSchema);
export default Department;