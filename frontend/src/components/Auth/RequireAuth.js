import React from 'react'
import { useLocation,Navigate,Outlet } from 'react-router'
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({allowedRole}) => {

    const role = sessionStorage.getItem('role')
    const location = useLocation();

  return (
    allowedRole?.includes(role)
        ? <Outlet/>
        : <Navigate to="/" state={{from: location}} replace />
         
  )
}

export default RequireAuth