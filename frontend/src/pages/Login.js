import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate ,Link, useLocation} from "react-router-dom";
import axios from "../axiosInstance/axiosApi";
// import { async } from "q";
// import { BASE_URL } from "../constants";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {

  const {setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || false;

  const styles = {
    container1: 'flex flex-row justify-center',
    image1: `basis-1/2 p-16  relative h-screen bg-[url(https://awsbucket99999.s3.ap-south-1.amazonaws.com/Vendorimages/Rectangle+33.png)]`,
    formWrapper1: 'basis-1/2 py-10 px-40 shadow-lg ',
    form1: `p-16 rounded-2xl`,
    heading: `font-bold text-5xl text-center mt-5 mb-14 font-Montserrat`,
    bannertext: `text-center text-white text-xl mt-5 font-Montserrat`,
    bannertext2: `text-center text-white text-5xl font-bold mt-4 font-Montserrat`,
    bannertext3: `text-center text-white text-2xl mt-96 font-Montserrat`,
    labelHeader: `block mb-2 text-2xl font-medium text-gray-900 dark:text-white font-Montserrat`,
    inputTag: `bg-gray-50 border border-orange-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
    button: `text-white justify-self-center  block item-center bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`,
    img: `max-h-screen w-full`,
    forgetpass: `underline ml-20 text-sm mt-0 text-blue-900`
  };

  
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [error,setError] = useState(null);


  const loginApiCall = async(reqBody) => {
    try {
      const res = await axios.post(`/auth/login`, reqBody,{ getCredentials: true },
      );
      const token = res.data.token;
      
      localStorage.setItem('token', token);
      document.cookie = `token=${token}`

      setAuth(res.data);
      
      console.log(res.data)
      const apiResponse = res.data;

      toast.success(`Welcome ${apiResponse.name}, ${apiResponse.role}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

      //to navigate from the page where it was redirected to login first  
      if(from){
        navigate(from,{replace:true});
      }  
      
      if(apiResponse.role === "ADMIN" ){
        navigate(`/admin`)
      }
      if(apiResponse.role === "VRO"){
        navigate(`/vro/${apiResponse._id}`)
      }

      if(apiResponse.role === "VENDOR"){
        navigate(`/vendor`)
      }

    } catch (err) {
      console.log(err.response?.data?.message);
      toast.error(err.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setError(err.response?.data?.message)
    }


    
  }

  const handleLogin = () => {
    // ... (your login logic)
    
    

    let role = null;
    const userId = 'user1';
    //API call here 
    // const reqBody = {
    //   email:email,
    //   password:password
    // }

    // console.log(reqBody)

    // loginApiCall(reqBody)

    //API response { logged in , ROLE : "ADMIN","VRO","VENDOR"}
    

    if (role === true) {
      console.log('Redirect to admin page')
      navigate(`/admin/${userId}`)
    }
    if (role === "VRO") {
      console.log("Redirect to VRO page")
      navigate(`/vro/${userId}`)
    }

    if (role === "VENDOR") {
      console.log("Redirect to Vendor page")
      navigate(`/vendor/${userId}`)
    }


  };

  return (
    <div className={styles.container1}>
      <div className={styles.image1}>

        {/* <p className={styles.bannertext}>logo</p> */}
        <p className={styles.bannertext2}>Neo Deals - Vendor Tool</p>
        <p className={styles.bannertext3}>Unwrap Big Deals</p>
      </div>
      <div className={styles.formWrapper1}>
        <h1 className={styles.heading}>Login</h1>

        <div className={styles.form1} style={{ boxShadow: ' 0px 0px 24px 6px rgba(0, 0, 0, 0.20)' }}>
          <div className="mb-6">
            <label htmlFor="email" className={styles.labelHeader}>
              Email ID
            </label>
            <input
              type="email"
              id="email"
              className={styles.inputTag}
              placeholder="Enter Your Username"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className={styles.labelHeader}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.inputTag}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#" className={styles.forgetpass}>Forgot Password ?</a>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />

          <button className={styles.button} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;



