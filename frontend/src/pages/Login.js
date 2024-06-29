import React, { useState } from 'react';
import './SignUpForm.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../constants/images/sahay 1.png';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';
import axios from 'axios';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      const res = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });
      console.log(res.data.userDoc);

      if (res.data.success) {
        if (res.data.userDoc.role === 'RANGER' || res.data.userDoc.role === 'CUSTOMER' ) {
          alert("Rangers are not allowed to log in.");
        } else {
          setAuth(res.data.userDoc._id);
          sessionStorage.setItem('auth', res.data.userDoc._id);

          if (res.data.userDoc.role === 'ADMIN') {
            navigate('/admin');
          } else if (res.data.userDoc.role === 'VRO') {
            navigate('/vro');
          } else {
            navigate('/vendor');
          }
        }
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className='flex justify-between items-center mb-4'>
            <p className="login-text">Login</p>
            <img src={logo} alt="Logo" className="logo" />
          </div>

          <label className='input-label'>Email or Phone Number</label>
          <input 
            type="email"
            placeholder="Email or Phone Number" 
            name="email" 
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <label className='input-label'>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FiEye onClick={() => setShowPassword(!showPassword)} className="toggle-password-icon" />
            ) : (
              <FiEyeOff onClick={() => setShowPassword(!showPassword)} className="toggle-password-icon" />
            )}
          </div>
          <button type="submit" className="button-confirm rounded-full">Login</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
