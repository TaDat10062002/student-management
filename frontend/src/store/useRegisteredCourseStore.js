import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useRegisteredCourseStore = create((set) => ({
    registeredCourses: [],
    isLoaded: false,
    pagination: {},
    setRegisteredCourses: () => set({ registeredCourses }),
    getAllRegisteredCourses: async (search, page, item_per_page) => {
        console.log(search);
        set({ isLoaded: false })
        try {
            const res = await axiosInstance.get(`/registered-course?search=${search}&page=${page}&item_per_page=${item_per_page}`);
            set({ registeredCourses: res.data.registeredCourses })
            set({ pagination: res.data.pagination })
            set({ isLoaded: true })
        } catch (error) {
            console.log(`Error in getAllRegisteredCourses ${error}`);
            toast.error(error.response.data.message);
        }
    }
}))

export default useRegisteredCourseStore;