import React, { useState } from 'react';
import './SignUpForm.css';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Importing icons

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="form w-fit mx-auto my-36 md:w-3/4 md:mt-72 lg:w-fit lg:mt-32 xl:w-fit xl:mt-28">
      <div className="title">Welcome,<br /><span>Login to continue</span></div>
      <input 
        type="email"
        placeholder="Email" 
        name="email" 
        className="input" 
      />
      <div className="password-container relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          className="input "
        />
        {showPassword ? (
          <FiEye onClick={() => setShowPassword(!showPassword)} className="toggle-password-icon absolute top-3 right-2" />
        ) : (
          <FiEyeOff onClick={() => setShowPassword(!showPassword)} className="toggle-password-icon absolute top-3 right-2" />
        )}
      </div>
      <button className="button-confirm">Let's go →</button>
    </form>
  );
};

export default SignUpForm;
