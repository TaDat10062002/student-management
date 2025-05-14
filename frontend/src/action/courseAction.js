import toast from "react-hot-toast";
import axiosInstance from "../lib/axios"

export const createCourse = async (data) => {
    try {
        const res = await axiosInstance.post('/course', data);
        toast.success(res.data.message);
    } catch (error) {
        console.log(`Error in getClassById ${error}`);
        toast.error(error.response.data.message);
    }
}