import { createContext, useContext } from 'react';

import { IAuthContext } from '../types';

export const AuthContext = createContext<IAuthContext>({ user: null, tokens: null });

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = AuthContext.Provider;
