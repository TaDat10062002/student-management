import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
    authUser: null,
    token: null,
    isLoggingIn: false,
    isCheckingAuth: true,
    isUpdating: false,
    setAuthUser: (authUser) => set({ authUser }),
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data.loggedUser });
            set({ token: res.data.access_token });
        } catch (error) {
            console.log(`Error in checkAuth ${error}`);
            // su dung id de phan biet cac toast voi nhau
            toast.error(error.response.data.message, {
                id: 'auth-expired'
            })
            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data.loggedUser });
            toast.success(res.data.message);
        } catch (error) {
            console.log(`Error in login ${error}`);
            toast.error(error.response.data.message)
        }
        finally {
            set({ isLoggingIn: false })
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success(res.data.message);
        } catch (error) {
            console.log(`Error in logout ${error}`);
        }
    },

    updateUser: async (userId, data) => {
        set({ isUpdating: true })
        try {
            const res = await axiosInstance.put(`/user/${userId}/edit`, data);
            set({ authUser: res.data.updatedUser })
            toast.success(res.data.message);
        } catch (error) {
            console.log(`Error in updateUser ${error}`);
            toast.error(error.response.data.message);
        }
        finally {
            set({ isUpdating: false })
        }
    }
}))

export default useAuthStore;