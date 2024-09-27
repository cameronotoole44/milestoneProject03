import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user);
    const storedUser = localStorage.getItem('currentUser');

    if (!currentUser && !storedUser) {
        return <Navigate to="/login" replace />;
    }

    const isAuthenticated = () => {
        if (storedUser) {
            const { expiresAt } = JSON.parse(storedUser);
            return new Date().getTime() < new Date(expiresAt).getTime();
        }
        return false;
    };

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
