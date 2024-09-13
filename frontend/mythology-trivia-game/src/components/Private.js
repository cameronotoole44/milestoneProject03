import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    const token = localStorage.getItem('token');

    if (!currentUser && !token) {

        return <Navigate to="/login" replace />;
    }


    return <Outlet />;
};

export default PrivateRoute;