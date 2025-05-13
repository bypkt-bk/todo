import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../../api/client';
import './register.css';

const Register = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    nationalId: '',
    title: '',
    firstname: '',
    lastname: '',
    password: ''
  });
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.nationalId.length < 13)
      return toast.error('National ID must be at least 13 characters long', {
        position: 'top-center',
        duration: 5000,
        style: {
          background: '#ff4444',
          color: '#fff',
        },
      });
    try {
      await apiClient.post('/users', { NationalId: formData.nationalId,
  Password: formData.password,
  Tittle: formData.title,
  Firstname: formData.firstname,
  Lastname: formData.lastname, });
      toast.success('Registration successful', {
        position: 'top-center',
        style: {
          background: '#4BB543',
          color: '#fff',
        },
      });
      navigator('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
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
      <div className="signin-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nationalId">National ID</label>
            <input
              type="text"
              id="nationalId"
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-group">
            <input
              type={showPassword ? "password" : "text"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={() => setShowPassword(prev => !prev)} >{showPassword ? '🙈' : '👁️'}</button>
          </div>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              Register
            </button>
          </div>
        </form>
        <div className="register-section">
                  <span>Have an account? </span>
                  <Link to="/" className="register-link">
                    Log in
                  </Link>
                </div>
      </div>
    </div>
  );
};

export default Register;
