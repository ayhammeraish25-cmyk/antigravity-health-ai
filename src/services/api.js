import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/users/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
        }
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post('/users', userData);
        if (response.data.token) {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('userInfo');
    },
    getProfile: async () => {
        const response = await api.get('/users/profile');
        return response.data;
    },
    forgotPassword: async (email) => {
        const response = await api.post('/users/forgotpassword', { email });
        return response.data;
    },
    resetPassword: async (token, password) => {
        const response = await api.put(`/users/resetpassword/${token}`, { password });
        return response.data;
    }
};

export const logService = {
    getTodayLog: async () => {
        const response = await api.get('/logs/today');
        return response.data;
    },
    logMeal: async (mealData) => {
        const response = await api.post('/logs/meal', mealData);
        return response.data;
    },
    logWater: async (amount) => {
        const response = await api.post('/logs/water', { amount });
        return response.data;
    },
    logWorkout: async (workoutData) => {
        const response = await api.post('/logs/workout', workoutData);
        return response.data;
    }
};

export const socialService = {
    searchUsers: async (query) => {
        const response = await api.get(`/social/search?q=${query}`);
        return response.data;
    },
    followUser: async (id) => {
        const response = await api.post(`/social/follow/${id}`);
        return response.data;
    },
    unfollowUser: async (id) => {
        const response = await api.post(`/social/unfollow/${id}`);
        return response.data;
    },
    getNetwork: async () => {
        const response = await api.get('/social/network');
        return response.data;
    }
};

export const aiService = {
    sendMessage: async (message) => {
        const response = await api.post('/ai/chat', { message });
        return response.data;
    }
};

export const fitnessService = {
    getDailyPlan: async () => {
        const response = await api.get('/fitness/daily-plan');
        return response.data;
    }
};

export const nutritionService = {
    getTargets: async () => {
        const response = await api.get('/nutrition/targets');
        return response.data;
    }
};

export default api;
