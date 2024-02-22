import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegistrationForm from '../components/auth/RegisterForm';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [view, setView] = useState('login');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const checkAndRedirect = async () => {
    // TODO - Check if user has canvas data
    // Should go in canvas service?
    const hasCanvasData = true;

    if (hasCanvasData) {
        navigate('/canvas-selection');
    } else {
        navigate('/code-upload'); 
    }
  };

  const handleLogin = async (email, password) => {
    setError(''); 
    try {
      const data = await authService.login(email, password);
      console.log("Login successful", data);
      localStorage.setItem('authToken', data.access_token);
      checkAndRedirect();
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
      checkAndRedirect();
    } catch (error) {
      console.error("Error during registration or login", error);
      setError('Registration or login failed. Please try again.');
    }
  };
  

  return (
    <>
      <p>Home Page - Landing, Registration, or Login</p>
      {error && <p className="error">{error}</p>}
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
