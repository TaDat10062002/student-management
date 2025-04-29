import axios from "axios";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useDepartmentStore = create((set) => ({
    departments: [],
    teachers: [],
    department: '',
    isLoaded: false,
    pagination: {},
    setDepartments: () => set({ departments }),
    getAllDepartments: async (search, page, item_per_page) => {
        set({ isLoaded: false })
        try {
            const res = await axiosInstance.get(`/department?search=${search}&page=${page}&item_per_page=${item_per_page}`);
            set({ departments: res.data.departments, pagination: res.data.pagination });
            set({ isLoaded: true })
        } catch (error) {
            console.log(`Error in getAllDepartments ${error}`);
            toast.error(error.response.data.message);
            set({ departments: [], pagination: {} })
        }
    },

    getTeachersByDepartment: async (id, search, page, item_per_page) => {
        set({ isLoaded: false })
        try {
            const res = await axiosInstance.get(`/department/${id}/view?search=${search}&page=${page}&item_per_page=${item_per_page}`);
            set({ teachers: res.data.teachers, pagination: res.data.pagination });
            set({ isLoaded: true })
        } catch (error) {
            console.log(`Error in getTeachersByDepartment ${error}`);
            toast.error(error.response.data.message);
            set({ departments: [], pagination: {} })
        }
    }
}))

export default useDepartmentStore;