import axios from 'axios';

import { getTokensFromLocalStorage } from './local-storage.util';

export const getClient = () => {
  const tokens = getTokensFromLocalStorage();

  return axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    headers: {
      Authorization: `Bearer ${tokens?.accessToken}`,
    },
  });
};
