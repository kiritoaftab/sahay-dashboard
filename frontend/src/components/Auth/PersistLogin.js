import { Outlet } from "react-router";
import { useState,useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";

const PersistLogin = () => {
    const [isLoading,setIsLoading] = useState(true);
    const {auth,setAuth} = useAuth();

    useEffect(()=>{
        const getTokenFromLocalAndVerify = async () => {
            try{
                const response =await axios.get('auth/valid',{withCredentials:true})
                console.log(response.data);
                setAuth(response.data)
            }catch(error){
                console.error(error)
            }
            finally{
                setIsLoading(false)
            }
        }

        !auth?.token ? getTokenFromLocalAndVerify() : setIsLoading(false);

    },[])

    useEffect(()=> {
        console.log(`isLoading : ${isLoading}`)
        console.log(`Auth Object : ${JSON.stringify(auth)}`)
    },[isLoading])

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                :<Outlet/>
            }
        </>
    )
}

export default PersistLogin;