import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import useDashBoardStore from "../store/useDashBoardStore";

export const getAllCourses = async (set, search, page, item_per_page) => {
    try {
        const res = await axiosInstance.get(`course?search=${search}&page=${page}&item_per_page=${item_per_page}`);
        set({ courses: res.data.courses })
        set({ pagination: res.data.pagination }),
            set({ isLoaded: true })
    } catch (error) {
        console.log(`Error in getAllCourses ${error}`);
        toast.error(error.response.data.message);
    }
}

export const createCourse = async (data) => {
    try {
        const res = await axiosInstance.post('/course', data);
        toast.success(res.data.message);
    } catch (error) {
        console.log(`Error in getClassById ${error}`);
        toast.error(error.response.data.message);
    }
}

export const updateCourseStatus = async (status, id) => {
    try {
        const res = await axiosInstance.put(`/course/${id}/update-status`, { status });
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in updateDepartmentStatus ${error}`);
        toast.error(error.response.data.message);
    }
}

export const getCourseById = async (set, id) => {
    try {
        const res = await axiosInstance.get(`/course/${id}/edit`);
        set({ course: res.data.course })
    } catch (error) {
        console.log(`Error in getCourseById ${error}`);
        toast.error(error.response.data.message);
        set({ course: {} })
    }
}

export const updateCourse = async (id, data) => {
    try {
        const res = await axiosInstance.put(`/course/${id}/update`, data);
        toast.success(res.data.message);
    } catch (error) {
        console.log(`Error in updateCourse ${error}`);
        toast.error(error.response.data.message);
        set({ course: {} })
    }
}

export const deleteCourse = async (id) => {
    try {
        const res = await axiosInstance.delete(`/course/${id}`);
        toast.success(res.data.message);
    } catch (error) {
        console.log(`Error in deleteCourse ${error}`);
        toast.error(error.response.data.message);
    }
}