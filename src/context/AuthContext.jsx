import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        setError(''); 
        try {
          const data = await authService.login(email, password);
          console.log("Login successful", data);
          localStorage.setItem('authToken', data.access_token);
          navigate('/canvas-selection');
        } catch (error) {
          console.error("Login error", error);
          setError('Failed to login. Please check your email and password.');
        }
      };
      
      const handleRegister = async (email, password) => {
        setError(''); 
        try {
          await authService.register(email, password);
          const loginResponse = await authService.login(email, password);
          console.log("Login successful", loginResponse);
          localStorage.setItem('authToken', loginResponse.access_token); 
          navigate('/canvas-selection');
        } catch (error) {
          console.error("Error during registration or login", error);
          setError('Registration or login failed. Please try again.');
        }
      };

    const value = {
        error,
        setError,
        handleLogin,
        handleRegister,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
