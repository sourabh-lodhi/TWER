import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoute = () => {
  const location = useLocation();
  const token = useSelector((state) => state?.auth?.token);
  if (!token) {
    return <Navigate to={'/'} replace state={{ preUri: location.pathname }} />;
  }

  return <Outlet />;
};
