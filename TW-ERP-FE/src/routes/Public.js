import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { routes } from '../utils';

export const PublicRoute = () => {
  const location = useLocation();
  const url = location?.state?.preUri || routes.general.dashboard;

  const token = useSelector((state) => state?.auth?.token);

  if (token) {
    return <Navigate to={url} replace />;
  }
  return <Outlet />;
};
