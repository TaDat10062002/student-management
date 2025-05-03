import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useCourseStore = create((set) => ({
    courses: [],
    pagination: {},
    isRegistering: false,
    studentOfCourse: {},
    isLoaded: false,
    setCourses: () => set({ courses }),
    getAllCourses: async (search, page, item_per_page) => {
        set({ isLoaded: false })
        try {
            const res = await axiosInstance.get(`course?search=${search}&page=${page}&item_per_page=${item_per_page}`);
            set({ courses: res.data.courses })
            set({ studentOfCourse: res.data.studentOfCourse }),
                set({ pagination: res.data.pagination }),
                set({ isLoaded: true })
        } catch (error) {
            console.log(`Error in getAllCourses ${error}`);
            toast.error(error.response.data.message);
        }
    },
    registerCourse: async (course_code, token) => {
        try {
            const res = await axiosInstance.post(
                `/registered-course/${course_code}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success(res.data.message)
        } catch (error) {
            console.log(`Error in registerCourse ${error}`);
            toast.error(error.response.data.message)
        }
    },
}))

export default useCourseStore;