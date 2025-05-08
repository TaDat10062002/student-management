import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const getDepartments = async (set) => {
    try {
        const res = await axiosInstance.get('/dashboard/department');
        set({ departments: res.data.departments });
    } catch (error) {
        console.log(`Error in getDepartments ${error}`);
        toast.error(error.response.data.message);
    }
}