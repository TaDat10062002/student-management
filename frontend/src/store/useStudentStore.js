import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useStudentStore = create((set) => ({
    students: [],
    isLoaded: false,
    pagination: {},
    setStudents: () => set({ students }),

    getStudents: async (search, page, item_per_page, departmentType) => {
        try {
            const res = await axiosInstance.get(`/student?search=${search}&page=${page}&item_per_page=${item_per_page}&departmentType=${departmentType}`);
            set({ students: res.data.students, pagination: res.data.pagination }),
                set({ isLoaded: true })
        } catch (error) {
            console.log(`Error in getStudents ${error}`);
            toast.error(error.response.data.message)
        }
    }
}))

export default useStudentStore;