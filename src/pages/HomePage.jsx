import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegistrationForm from '../components/auth/RegisterForm'; 
import { authService } from '../services/authService';

const HomePage = () => {
  const [view, setView] = useState('login');

  const handleLogin = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      console.log("Login successful", data);
      // Handle successful login
    } catch (error) {
      console.error("Login error", error);
      // Handle login error
    }
  };

  const handleRegister = async (email, password) => {
    try {
      const data = await authService.register(email, password);
      console.log("Registration successful", data);
      // Handle successful registration
    } catch (error) {
      console.error("Registration error", error);
      // Handle registration error
    }
  };

  return (
    <>
      <p>Home Page - Landing, Registration, or Login</p>
      {view === 'login' ? (
        <>
          <LoginForm onLogin={handleLogin} />
          <button onClick={() => setView('register')}>Go to Register</button>
        </>
      ) : (
        <>
          <RegistrationForm onRegister={handleRegister} />
          <button onClick={() => setView('login')}>Go to Login</button>
        </>
      )}
    </>
  );
};

export default HomePage;
