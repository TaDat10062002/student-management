import axios from "axios";
import { create } from "zustand";
import axiosInstance from "../lib/axios";


const useDashBoardStore = create((set) => ({
    totalStatistic: {},
    users: [],
    departments: [],
    classrooms: [],
    pagination: {},
    isLoaded: false,
    setDashboard: () => set({ totalStatistic }),
    getDashBoardStatistic: async () => {
        try {
            const res = await axiosInstance.get('/dashboard');
            set({ totalStatistic: res.data.totalStatistic, isLoaded: true });
        } catch (error) {
            console.log(`Error in getDashBoardStatistic ${error}`);
            toast.error(error.response.data.message);
        }
    },
    getUsers: async (page, item_per_page) => {
        try {
            const res = await axiosInstance.get(`/user?page=${page}&item_per_page=${item_per_page}`);
            set({ users: res.data.users, pagination: res.data.pagination });
            set({ isLoaded: true });
        } catch (error) {
            console.log(`Error in getUsers ${error}`);
            toast.error(error.response.data.message);
        }
    },
    getDepartments: async () => {
        try {
            const res = await axiosInstance.get('/dashboard/department');
            set({ departments: res.data.departments });
        } catch (error) {
            console.log(`Error in getDepartments ${error}`);
            toast.error(error.response.data.message);
        }
    },
    getClassrooms: async () => {
        try {
            const res = await axiosInstance.get('/dashboard/classroom');
            set({ classrooms: res.data.classrooms });
        } catch (error) {
            console.log(`Error in getClassrooms ${error}`);
            toast.error(error.response.data.message);
        }
    }
}))

export default useDashBoardStore;