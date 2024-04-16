import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context';
import { gamesService } from '../../services';
import { IGame } from '../../types/game.interface';
import { socket } from '../../utils';

const useHome = () => {
  const [isLoading, setLoading] = useState(false);
  const [games, setGames] = useState<IGame[]>([]);
  const [game, setGame] = useState<IGame | null>(null);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const onCreateNewGame = useCallback(async () => {
    if (user) {
      setLoading(true);

      socket.emit('create-game', { ownerId: user.id });
    }
  }, [user]);

  const onCancelGame = useCallback(() => {
    if (user) {
      socket.emit('cancel-game', { ownerId: user.id });
      setLoading(false);
    }
  }, [user]);

  const onJoinToGameGame = useCallback(
    (id: string) => {
      if (user) {
        socket.emit('join-game', { id, member_id: user.id });
      }
    },
    [user],
  );

  const getGames = useCallback(async () => {
    const { data } = await gamesService.getGames();

    setGames(data);
  }, []);

  useEffect(() => {
    getGames();
  }, [getGames]);

  useEffect(() => {
    socket.on('start-game', (game) => {
      navigate(`game/${game.id}`);
    });
  }, [navigate]);

  useEffect(() => {
    socket.on('created-game', (game: IGame) => {
      if (game.owner_id !== user?.id) {
        setGame(game);
      }
    });

    if (!games.find((game) => game.id === game.id) && game) {
      setGames((prev) => [...prev, game]);
    }

    setGame(null);
  }, [game, games, user?.id]);

  useEffect(() => {
    socket.on('canceled-game', (game) => {
      setGames(games.filter((item) => item.id !== game.id));
    });
  }, [games]);

  return { games, isLoading, onCancelGame, onCreateNewGame, onJoinToGameGame };
};

export default useHome;
