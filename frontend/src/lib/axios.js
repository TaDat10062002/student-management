import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: 'http://localhost:5000/api',
    withCredentials: true // de tim cookie
})

export default axiosInstance;