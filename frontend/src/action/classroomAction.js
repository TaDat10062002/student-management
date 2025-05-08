import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const getClassrooms = async (set) => {
    try {
        const res = await axiosInstance.get('/dashboard/classroom');
        set({ classrooms: res.data.classrooms });
    } catch (error) {
        console.log(`Error in getClassrooms ${error}`);
        toast.error(error.response.data.message);
    }
}