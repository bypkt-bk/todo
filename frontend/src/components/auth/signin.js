import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/client';
import './signin.css';
const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(['token']);
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiClient.post('/tokens', { nationalId: username, password });
      toast.success('Login successful', {
        position: 'top-center',
        style: {
          background: '#4BB543',
          color: '#fff',
        },
      });
      setCookie('token', data.token, { path: '/', maxAge: 60 });
      navigator('/main');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      toast.error(errorMessage, {
        position: 'top-center',
        duration: 5000,
        style: {
          background: '#ff4444',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h1 className="app-title">Todo</h1>
        <h2 className="form-title">Sign In</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="">
          <label>Password</label>
          <div className='password-group'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowPassword(prev => !prev)} >{showPassword ? '👁️' : '🙈'}</button>
        </div></div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <div className="register-section">
          <span>Don't have an account? </span>
          <Link to="/register" className="register-link">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;