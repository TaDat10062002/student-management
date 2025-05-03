import axios from "axios";
import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const useSubjectStore = create((set) => ({
    subjects: [],
    pagination: {},
    isLoaded: false,
    setSubjects: () => set({ subjects }),

    getSubjects: async (search, page, item_per_page) => {
        set({ isLoaded: false })
        try {
            const res = await axiosInstance.get(`/subject?search=${search}&page=${page}&item_per_page=${item_per_page}`);
            set({ subjects: res.data.subjects, pagination: res.data.pagination });
            set({ isLoaded: true })
        } catch (error) {
            console.log(`Error in getSubjects ${error}`);
            set({ subjects: [], pagination: {} });
            toast.error(error.response.data.message);
        }
    }
}))

export default useSubjectStore;