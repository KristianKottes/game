import { useCallback, useEffect, useState } from 'react';

import { authService } from '../../services';
import { IAuthContext } from '../../types';
import { getAuthDataFromLocalStorage, getTokensFromLocalStorage } from '../../utils';

const useAuthProvider = () => {
  const [value, setValue] = useState<IAuthContext>(getAuthDataFromLocalStorage());

  const getUserProfile = useCallback(async () => {
    try {
      const tokens = value.tokens ?? getTokensFromLocalStorage();

      if (!tokens) {
        return;
      }

      if (!value.tokens) {
        setValue((prev) => ({ ...prev, tokens }));
      }

      const { data } = await authService.getUserProfile();

      localStorage.setItem('user', JSON.stringify(data));
      setValue((prev) => ({ ...prev, user: data }));
    } catch (e: any) {
      if (e.response.status === 401 && value.tokens?.refreshToken) {
        authService
          .refreshToken(value.tokens?.refreshToken)
          .then(({ data }) => {
            localStorage.setItem('tokens', JSON.stringify(data));
            setValue((prev) => ({ ...prev, data }));
          })
          .catch(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('tokens');

            setValue({ tokens: null, user: null });
          });
      }
    }
  }, [value.tokens]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    document.addEventListener('setTokens', getUserProfile);

    return () => {
      document.removeEventListener('setTokens', getUserProfile);
    };
  }, [getUserProfile]);

  return value;
};

export default useAuthProvider;
