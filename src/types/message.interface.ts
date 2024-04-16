import { IGame } from './game.interface';
import { IUser } from './user.interface';

export interface IPopulatedMessage {
  id: string;
  text: string;
  sender: IUser;
  recipient: IUser;
  game: IGame;
  created_at: string;
}
