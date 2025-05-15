import toast from "react-hot-toast";
import axiosInstance from "../lib/axios"

export const createSubject = async (data) => {
    try {
        const res = await axiosInstance.post('/subject', data);
        toast.success(res.data.message);
    } catch (error) {
        console.log(`Error in createSubject ${error}`);
        toast.error(error.response.data.message)
    }
}

export const getSubjectById = async (set, id) => {
    try {
        const res = await axiosInstance.get(`/subject/${id}/edit`);
        set({ subject: res.data.subject })
    } catch (error) {
        console.log(`Error in getSubjectById ${error}`);
        set({ subject: {} })
        toast.error(error.response.data.message)
    }
}

export const updateSubject = async (id, data) => {
    try {
        const res = await axiosInstance.put(`/subject/${id}/update`, data);
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in updateSubject ${error}`);
        toast.error(error.response.data.message)
    }
}

export const deleteSubject = async (id) => {
    try {
        const res = await axiosInstance.delete(`/subject/${id}/`);
        toast.success(res.data.message)
    } catch (error) {
        console.log(`Error in deleteSubject ${error}`);
        toast.error(error.response.data.message)
    }
}
