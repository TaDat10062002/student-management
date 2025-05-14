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

export const getClassroomsPagination = async (set, search, page, item_per_page) => {
    try {
        const res = await axiosInstance.get(`/class?search=${search}&page=${page}&item_per_page=${item_per_page}`);
        set({ classrooms: res.data.classrooms });
        set({ pagination: res.data.pagination });
        set({ studentInClass: res.data.studentInClass });
        set({ isLoaded: true })
    } catch (error) {
        console.log(`Error in getClassroomsPagination ${error}`);
        set({ classrooms: [] });
        set({ pagination: {} });
        set({ isLoaded: true })
        toast.error(error.response.data.message);
    }
}

export const createClass = async (data) => {
    try {
        const res = await axiosInstance.post(`/class`, data);
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in createClass ${error}`);
        toast.error(error.response.data.message)
    }
}

export const getClassById = async (set, id) => {
    try {
        const res = await axiosInstance.get(`class/${id}/edit`);
        set({ classroom: res.data.classroom })
    } catch (error) {
        console.log(`Error in getClassById ${error}`);
        set({ classroom: null })
        toast.error(error.response.data.message)
    }
}

export const updateClass = async (id, data) => {
    try {
        const res = await axiosInstance.put(`class/${id}/update`, data);
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in updateClass ${error}`);
        toast.error(error.response.data.message)
    }
}

