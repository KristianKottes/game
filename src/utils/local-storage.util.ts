import { ITokens } from '../types';

export const getTokensFromLocalStorage = (): ITokens | null => {
  const tokens = localStorage.getItem('tokens');

  return tokens ? JSON.parse(tokens) : null;
};

export const getAuthDataFromLocalStorage = () => {
  const tokens = localStorage.getItem('tokens');
  const user = localStorage.getItem('user');

  return {
    tokens: tokens ? JSON.parse(tokens) : null,
    user: user ? JSON.parse(user) : null,
  };
};
