import { IUser, ISignUpRequest, ISignUpResponse, ITokens } from '../types';
import { getClient } from '../utils/axios.util';

const refreshToken = async (refreshToken: string) =>
  getClient().post<ITokens>('/auth/refresh', { refreshToken });

const signIn = async ({ username, password }: ISignUpRequest) => {
  const data = await getClient().post<ITokens>('/auth/sign-in', { username, password });

  return data;
};

const signUp = async ({ username, password }: ISignUpRequest) => {
  const data = await getClient().post<ISignUpResponse>('/auth/sign-up', { username, password });

  return data;
};

const getUserProfile = () => getClient().get<IUser>('/auth/profile');

export default { signUp, signIn, getUserProfile, refreshToken };
