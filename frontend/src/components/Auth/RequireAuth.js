import React from 'react'
import { useLocation,Navigate,Outlet } from 'react-router'
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({allowedRole}) => {

    const {auth} = useAuth();
    const location = useLocation();

  return (
    allowedRole?.includes(auth.role)
        ? <Outlet/>
        : auth?.user 
            ? <Navigate to="/unauthorized" state={{from: location}} replace />
            : <Navigate to="/" state={{from: location}} replace />
         
  )
}

export default RequireAuth