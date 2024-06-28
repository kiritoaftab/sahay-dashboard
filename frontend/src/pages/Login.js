// import React, { useState } from 'react';
// import './SignUpForm.css';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import logo from '../constants/images/sahay 1.png';
// import useAuth from '../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../constants';

// const SignUpForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const {auth, setAuth} = useAuth();
//   const navigate =  useNavigate();

//   const handleSubmit = async (e) =>{
//     e.preventDefault();
//     console.log(email, password);

//     if(email != "saif@sahay24x7.com"){
//       try{
//         const res = await axios.post(`${BASE_URL}/user/login/${email}/${password}`);
//         console.log(res.data.data);
//         setAuth(res.data.data.id);
//         sessionStorage.setItem('auth', res.data.data.id);
//         navigate('/vendor');
//       }catch(error){
//         console.log(error);
//         alert("Invalid Credentials");
//       }
//     }
//     else if(email == "saif@sahay24x7.com"){
//       try{

//   }

//   return (
//     <div className="login-container">
//       <div className="overlay"></div>
//       <div className="form-container">
//         <form className="form">
//           <div className='flex justify-between items-center mb-4'>
//             <p className="login-text">Login</p>
//             <img src={logo} alt="Logo" className="logo" />
//           </div>
          
//           <label className='input-label'>Email or Phone Number</label>
//           <input 
//             type="email"
//             placeholder="Email or Phone Number" 
//             name="email" 
//             className="input" 
//           />
//           <div className="password-container">
//             <label className='input-label'>Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               name="password"
//               className="input"
//             />
//             {showPassword ? (
//               <FiEye onClick={() => setShowPassword(!showPassword)} className="toggle-password-icon" />
//             ) : (
//               <FiEyeOff onClick={() => setShowPassword(!showPassword)} className="toggle-password-icon" />
//             )}
//           </div>
//           <button className="button-confirm rounded-full">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
