import { IUser } from './user.interface';

export interface ISignUpResponse {
  user: IUser;
  tokens: ITokens;
}

export interface ISignUpRequest {
  username: string;
  password: string;
}

export interface IAuthContext {
  tokens: ITokens | null;
  user: IUser | null;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
