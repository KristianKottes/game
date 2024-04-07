import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../context';

const AuthGuard = ({ children }: { children: React.JSX.Element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { tokens } = useAuthContext();

  useEffect(() => {
    if (['/sign-in', '/sign-up'].includes(location.pathname) && tokens) {
      navigate('/');
    }
  }, [location.pathname, navigate, tokens]);

  return children;
};

export default AuthGuard;
