import React from 'react';

import { AuthContextProvider } from '../../context';

import useAuthProvider from './useAuthProvider';

import type { PropsWithChildren } from 'react';

const AuthProvider = ({ children }: PropsWithChildren<object>) => {
  const value = useAuthProvider();

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>;
};

export default AuthProvider;
