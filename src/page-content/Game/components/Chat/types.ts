import { IPopulatedMessage } from '../../../../types';

export interface IChatProps {
  message: string;
  messages: IPopulatedMessage[];
  onMessageChange: (e: any) => void;
  onMessageSend: () => void;
}
