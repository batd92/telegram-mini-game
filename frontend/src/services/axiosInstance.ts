import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:3000'; //process.env.API_BASE_URL || 'http://localhost:3000';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// response
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
        console.error('error: ', error.message);
        return Promise.reject(error);
    },
);

export default axiosInstance;
