import { IUser } from '../../../../types';

export interface ITitleProps {
  userId?: string;
  currentTurnUser: IUser | null;
}
