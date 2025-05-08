import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const getUsers = async (set, search, page, item_per_page, departmentID, role) => {
    try {
        const res = await axiosInstance.get(`/user?search=${search}&page=${page}&item_per_page=${item_per_page}&departmentID=${departmentID}&role=${role}`);
        set({ users: res.data.users, pagination: res.data.pagination });
        set({ isLoaded: true });
    } catch (error) {
        console.log(`Error in getUsers ${error}`);
        toast.error(error.response.data.message);
    }
}

export const createUser = async (set, data, user) => {
    try {
        const res = await axiosInstance.post(`/user/${user}/create`, data);
        toast.success(res.data.message);
    } catch (error) {
        console.log(`Error in createUser ${error}`);
        toast.error(error.response.data.message);
    }
}

export const updateAccountStatus = async (set, status, userId) => {
    try {
        const res = await axiosInstance.put(`user/${userId}/status-account`, { status });
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in updateAccountStatus ${error}`);
        toast.error(error.response.data.message);
    }
}