import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const useCourseStore = create((set) => ({
    courses: [],
    course: null,
    pagination: {},
    isRegistering: false,
    studentOfCourse: {},
    teacherCourses: [],
    students: [],
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
    registerCourse: async (course_code) => {
        try {
            const res = await axiosInstance.post(
                `/registered-course/${course_code}`,
                {}
            );
            toast.success(res.data.message)
        } catch (error) {
            console.log(`Error in registerCourse ${error}`);
            toast.error(error.response.data.message)
        }
    },
    getTeacherCourses: async () => {
        try {
            const res = await axiosInstance.get(`course/teacher-course`);
            set({ teacherCourses: res.data.teacherCourses })
            set({ pagination: res.data.pagination })
            set({ isLoaded: true })
        } catch (error) {
            console.log(`Error in getTeacherCourses ${error}`);
            toast.error(error.response.data.message);
        }
    },
    getStudentInTeacherCourse: async (course_code) => {
        try {
            const res = await axiosInstance.get(`course/teacher-course/${course_code}/view-students`);
            set({ students: res.data.students })
            set({ course: res.data.students[0].subjectInfo.name })
            set({ pagination: res.data.pagination })
            set({ isLoaded: true })
        } catch (error) {
            console.log(`Error in getStudentInTeacherCourse ${error}`);
            toast.error(error.response.data.message);
        }
    },
    updateStudentScore: async (id, score, course_code) => {
        try {
            const res = await axiosInstance.put(`registered-course/${id}/edit-score`, { score: score });
            toast.success(res.data.message);
            useCourseStore.getState().getStudentInTeacherCourse(course_code)
        } catch (error) {
            console.log(`Error in updateStudentScore ${error}`);
            toast.error(error.response.data.message);
        }
    }
}))

export default useCourseStore;