import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';

const PrivateRoute = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
