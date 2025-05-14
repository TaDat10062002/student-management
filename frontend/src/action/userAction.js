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

export const getUserById = async (set, id) => {
    try {
        const res = await axiosInstance.get(`/user/${id}/edit`);
        set({ isLoaded: true })
        set({ user: res.data.user })
    } catch (error) {
        console.log(`Error in getUserById ${error}`);
        toast.error(error.response.data.message);
    }
}

export const updateUser = async (id, data, role) => {
    try {
        const res = await axiosInstance.put(`/user/${id}/update-${role}`, data)
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in updateUser ${error}`);
        toast.error(error.response.data.message);
    }
}

export const createUser = async (data, user) => {
    try {
        const res = await axiosInstance.post(`/user/${user}/create`, data);
        toast.success(res.data.message);
    } catch (error) {
        console.log(`Error in createUser ${error}`);
        toast.error(error.response.data.message);
    }
}

export const updateAccountStatus = async (status, userId) => {
    try {
        const res = await axiosInstance.put(`user/${userId}/status-account`, { status });
    } catch (error) {
        console.log(`Error in updateAccountStatus ${error}`);
        toast.error(error.response.data.message);
    }
}