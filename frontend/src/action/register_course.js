import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export const getAllRegisterCourses = async (set, search, page, item_per_page) => {
    try {
        const res = await axiosInstance.get(`/dashboard/registered-course?seach=${search}&page=${page}&item_per_page=${item_per_page}`);
        set({ registeredCourses: res.data.registeredCourses })
        set({ pagination: res.data.pagination })
        set({ isLoaded: true })
    } catch (error) {
        console.log(`Error in getAllgetAllRegisterCourses ${error}`);
        toast.error(error.response.data.message);
    }
}

export const updateRegisterCourseStatus = async (status, id) => {
    try {
        const res = await axiosInstance.put(`/registered-course/${id}/update-status`, { status });
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in updateRegisterCourseStatus ${error}`);
        toast.error(error.response.data.message);
    }
}