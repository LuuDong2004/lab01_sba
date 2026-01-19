import { useState } from 'react';
import React from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saveUser = localStorage.getItem("authUser");
            return saveUser ? JSON.parse(saveUser) : null;
        } catch(error) {
            console.error('Error parsing authUser from localStorage:', error);
            return null;
        }
    });


    const [loading, _setLoading] = useState(false);

    const login = (userData) => {
        try {
            setUser(userData);
            localStorage.setItem("authUser", JSON.stringify(userData));
        } catch(error) {
            console.error('Error saving user data to localStorage:', error);
        }
    };

    const logout = () => {
        try {
            setUser(null);
            localStorage.removeItem("authUser");

        } catch(error) {
            setUser(null);
            console.error('Error removing user data from localStorage:', error);
        }

    }
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;