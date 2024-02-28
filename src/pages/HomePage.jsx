import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegistrationForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const [view, setView] = useState('login');
  const { handleLogin, handleRegister, error } = useAuth();

  return (
    <div className="home-container">
      <div className="login-register-container">
        <div className="tabs">
          <button className={`tab ${view === 'login' ? 'active' : ''}`} onClick={() => setView('login')}>
            Login
          </button>
          <button className={`tab ${view === 'register' ? 'active' : ''}`} onClick={() => setView('register')}>
            Register
          </button>
        </div>
        <div className="form-container">
          <p>Welcome to Aeroblocks</p>
          {error && <p className="error">{error}</p>}
          {view === 'login' ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <RegistrationForm onRegister={handleRegister} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;