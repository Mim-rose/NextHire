import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children}) => {

   const {user, loading} = useContext(AuthContext);
   const location = useLocation();
   console.log(location);

    if (loading) {

        return <span className="loading loading-spinner loading-xs"></span>
    }



   if (user) {
    return children;
   }

  return <Navigate to="/signin" state={location?.pathname}>   </Navigate>
    
}

export default PrivateRoute;