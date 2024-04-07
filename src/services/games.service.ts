import { IGame } from '../types/game.interface';
import { getClient } from '../utils/axios.util';

const createNewGame = async (ownerId: string) => {
  await getClient().post('/games/create', { owner_id: ownerId });
};

const getGame = async (id: string) => {
  return getClient().get<IGame>(`/games/current-game/${id}`);
};

const getGames = async () => {
  return getClient().get<IGame[]>('/games/list');
};

const joinToGame = async (id: string) => {
  return getClient().post('/games/join-to-game', { id });
};

const generateMaze = async (gameId: string) => {
  return getClient().post(`/games/generate-maze/${gameId}`);
};

export default { createNewGame, getGame, getGames, joinToGame, generateMaze };
