import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const getDepartments = async (set) => {
    try {
        const res = await axiosInstance.get('/dashboard/department');
        set({ departments: res.data.departments });
        set({ isLoaded: true })
    } catch (error) {
        console.log(`Error in getDepartments ${error}`);
        toast.error(error.response.data.message);
    }
}

export const getDepartmentsPagination = async (set, search, page, item_per_page) => {
    try {
        const res = await axiosInstance.get(`/department?search=${search}&page=${page}&item_per_page=${item_per_page}`);
        set({ departments: res.data.departments });
        set({ pagination: res.data.pagination });
        set({ isLoaded: true })
    } catch (error) {
        console.log(`Error in getDepartmentsPagination ${error}`);
        toast.error(error.response.data.message);
    }
}

export const getDepartmentById = async (set, id) => {
    try {
        const res = await axiosInstance.get(`/department/${id}/edit`);
        set({ department: res.data.department })
    } catch (error) {
        console.log(`Error in getDepartmentById ${error}`);
        toast.error(error.response.data.message);
    }
}

export const createDepartment = async (set, data) => {
    try {
        const res = await axiosInstance.post('/department', data);
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in createDepartment ${error}`);
        toast.error(error.response.data.message);
    }
}

export const updateDepartment = async (set, id, data) => {
    try {
        const res = await axiosInstance.put(`/department/${id}/update`, data);
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in updateDepartment ${error}`);
        toast.error(error.response.data.message);
    }
}

export const updateDepartmentStatus = async (set, status, id) => {
    try {
        const res = await axiosInstance.put(`/department/${id}/update-status`, { status });
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in updateDepartmentStatus ${error}`);
        toast.error(error.response.data.message);
    }
}