import axiosInstance from './axiosInstance';

export const fetchTasks = async () => {
    const response = await axiosInstance.get('/tasks');
    return response.data;
};

export const updateTask = async (id: number, taskData: { title: string }) => {
    const response = await axiosInstance.put(`/tasks/${id}`, taskData);
    return response.data;
};

export const fetchUsers = async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
};

export const updateUser = async (id: number, userData: { name: string; email: string }) => {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
};

export const fetchGameHistory = async () => {
    const response = await axiosInstance.get('/game-history');
    return response.data;
};

export const addGameHistory = async (gameData: { userId: string; score: number }) => {
    const response = await axiosInstance.post('/game-history', gameData);
    return response.data;
};

export const fetchTotalScore = async () => {
    const response = await axiosInstance.get('/game-history/total-score');
    return response.data;
};

export const fetchTaskHistory = async () => {
    const response = await axiosInstance.get('/task-history');
    return response.data;
};

