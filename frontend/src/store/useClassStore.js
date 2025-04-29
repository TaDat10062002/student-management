import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useClassStore = create((set) => ({
    classrooms: [],
    classroom: '',
    studentByClass: [],
    pagination: {},
    isLoaded: false,
    isFetchingStudentByClass: false,
    setClassRooms: () => set({ classrooms }),
    getAllClasses: async (page, search, item_per_page) => {
        set({ isLoaded: false })
        try {
            const res = await axiosInstance.get(`/class?search=${search}&page=${page}&item_per_page=${item_per_page}`);
            set({ classrooms: res.data.classrooms, pagination: res.data.pagination })
            set({ isLoaded: true })
        } catch (error) {
            console.log(`Error in getAllClasses ${error}`);
            set({ classrooms: [], pagination: {} })
            toast.error(error.response.data.message)
        }
    },

    getStudentByClass: async (id, search, page, item_per_page) => {
        set({ isLoaded: false })
        try {
            const res = await axiosInstance.get(`/class/${id}/view?search=${search}&page=${page}&item_per_page=${item_per_page}`);
            set({ studentByClass: res.data.students, classroom: res.data.classroom, pagination: res.data.pagination })
            set({ isLoaded: true })
        } catch (error) {
            console.log(`Error in getStudentByClass ${error}`);
            set({ studentByClass: [], classroom: null, pagination: {} })
            toast.error(error.response.data.message)
        }
    }
}))

export default useClassStore;