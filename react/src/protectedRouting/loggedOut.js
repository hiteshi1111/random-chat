import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const LoggedOut = () => {
    const key = localStorage.getItem("xiu");
    return key ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default LoggedOut;