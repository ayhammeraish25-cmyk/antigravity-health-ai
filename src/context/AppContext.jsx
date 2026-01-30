import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, logService } from '../services/api';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [today, setToday] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        hydration: 0,
        steps: 0,
        meals: [],
        completedWorkouts: []
    });
    const [devices, setDevices] = useState({
        watch: { connected: false, lastSync: null },
        ring: { connected: false, lastSync: null }
    });
    const [loading, setLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('userInfo'));
                if (storedUser && storedUser.token) {
                    const profile = await authService.getProfile();
                    setUser({ ...profile, token: storedUser.token });

                    const log = await logService.getTodayLog();
                    setToday(log);
                }
            } catch (error) {
                console.error("Failed to load initial data", error);
                localStorage.removeItem('userInfo');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Auth Actions
    const login = async (email, password) => {
        const data = await authService.login(email, password);
        setUser(data);
        const log = await logService.getTodayLog();
        setToday(log);
        return data;
    };

    const register = async (userData) => {
        const data = await authService.register(userData);
        setUser(data);
        const log = await logService.getTodayLog();
        setToday(log);
        return data;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setToday({
            calories: 0, hydration: 0, steps: 0, meals: [], completedWorkouts: []
        });
    };

    // Data Actions
    const updateUser = async (updates) => {
        // For MVP, we assume settings update is local or we add an API endpoint later.
        // Currently API doesn't have update profile endpoint, so we just update local state
        // creating an illusion of speed, but strictly we should persist.
        // TODO: Add PUT /api/users/profile
        setUser(prev => ({ ...prev, ...updates }));
    };

    const logWater = async (amountL) => {
        try {
            const updatedLog = await logService.logWater(amountL);
            setToday(updatedLog);
        } catch (error) {
            console.error("Log water failed", error);
        }
    };

    const logMeal = async (meal) => {
        try {
            const updatedLog = await logService.logMeal(meal);
            setToday(updatedLog);
        } catch (error) {
            console.error("Log meal failed", error);
        }
    };

    const completeWorkout = async (workout) => {
        try {
            const updatedLog = await logService.logWorkout(workout);
            setToday(updatedLog);
        } catch (error) {
            console.error("Log workout failed", error);
        }
    };

    const toggleDevice = (type, isConnected) => {
        setDevices(prev => ({
            ...prev,
            [type]: { connected: isConnected, lastSync: isConnected ? Date.now() : null }
        }));
    };

    return (
        <AppContext.Provider value={{
            user,
            loading,
            devices,
            today,
            login,
            register,
            logout,
            updateUser,
            logWater,
            logMeal,
            toggleDevice,
            completeWorkout
        }}>
            {children}
        </AppContext.Provider>
    );
};
