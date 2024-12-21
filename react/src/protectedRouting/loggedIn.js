import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const LoggedIn = () => {
    const key = localStorage.getItem("xiu");
    return key ? (
        <Navigate to="/chat" />
    ) : (
        <Outlet />
    );
};

export default LoggedIn;