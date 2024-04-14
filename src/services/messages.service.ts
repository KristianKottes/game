import { IPopulatedMessage } from '../types/message.interface';
import { getClient } from '../utils';

const getMessages = async (game_id: string) => {
  return getClient().get<IPopulatedMessage[]>(`/messages/${game_id}`);
};

export default { getMessages };
