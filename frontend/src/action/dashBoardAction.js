import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const getDashBoardStatistic = async (set) => {
    try {
        const res = await axiosInstance.get('/dashboard');
        set({ totalStatistic: res.data.totalStatistic, isLoaded: true });
    } catch (error) {
        console.log(`Error in getDashBoardStatistic ${error}`);
        toast.error(error.response.data.message);
    }
}

export const getTeachers = async (set) => {
    try {
        const res = await axiosInstance.get('/dashboard/teacher');
        set({ teachers: res.data.teachers, isLoaded: true });
    } catch (error) {
        console.log(`Error in getDashBoardStatistic ${error}`);
        toast.error(error.response.data.message);
    }
}

export const getSubjects = async (set) => {
    try {
        const res = await axiosInstance.get('/dashboard/subject');
        set({ subjects: res.data.subjects, isLoaded: true });
    } catch (error) {
        console.log(`Error in getDashBoardStatistic ${error}`);
        toast.error(error.response.data.message);
    }
}