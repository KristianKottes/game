import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../../../context';

const RouteGuard = () => {
  const { tokens } = useAuthContext();

  return tokens ? <Outlet /> : <Navigate to="sign-in" />;
};
export default RouteGuard;
