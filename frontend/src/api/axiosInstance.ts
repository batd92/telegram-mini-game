import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.example.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// request
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
    (error) => Promise.reject(error)
);

// response
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
