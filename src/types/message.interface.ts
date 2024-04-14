import { IGame } from './game.interface';
import { IUser } from './user.interface';

export interface IMessage {
  sender_id: string;
  recipient_id: string;
  game_id: string;
  text: string;
}

export interface IPopulatedMessage {
  id: string;
  text: string;
  sender: IUser;
  recipient: IUser;
  game: IGame;
  created_at: string;
}
