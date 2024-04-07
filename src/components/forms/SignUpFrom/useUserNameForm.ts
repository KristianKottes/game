import { useFormik } from 'formik';
import { useCallback } from 'react';

import { authService } from '../../../services';

const useUserNameForm = () => {
  const handleSubmit = useCallback(async (values: any) => {
    const { data } = await authService.signUp(values);

    localStorage.setItem('tokens', JSON.stringify(data.tokens));
    localStorage.setItem('user', JSON.stringify(data.user));

    document.dispatchEvent(new Event('setTokens'));
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return { formik };
};

export default useUserNameForm;
