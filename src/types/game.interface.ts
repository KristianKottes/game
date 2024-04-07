import { IUser } from './user.interface';

export interface IGame {
  id: string;
  owner_id: string;
  member_id: string;
  current_turn_user_id?: string;
  owner?: IUser;
  currentTurnUser?: IUser;
  maze: number[][][];
}
