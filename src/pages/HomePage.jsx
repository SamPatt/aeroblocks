import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import RegistrationForm from '../components/auth/RegisterForm';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const [view, setView] = useState('login');
  const { handleLogin, handleRegister, checkAndRedirect, error } = useAuth();
  const navigate = useNavigate();

  
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
