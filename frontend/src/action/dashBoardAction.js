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