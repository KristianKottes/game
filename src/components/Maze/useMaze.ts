import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuthContext } from '../../context';
import { gamesService } from '../../services';
import { IUser } from '../../types';
import { socket } from '../../utils';

const getData = (data: number[][][], position: number[]) => {
  return data[position[0]][position[1]];
};

const useMaze = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [mazeData, setMazeData] = useState<number[][][]>([]);
  const [currentPosition, setCurrentPosition] = useState<number[]>([0, 0]);
  const [currentTurnUser, setCurrentTurnUser] = useState<IUser | null>(null);

  const [winner, setWinner] = useState<IUser | null>(null);

  const { gameId } = useParams();

  const handleMove = useCallback(
    (e: any) => {
      if (currentTurnUser?.id !== user?.id || !gameId || winner) {
        return;
      }

      const data = getData(mazeData, currentPosition);

      switch (e.key) {
        case 'ArrowDown':
          if (data[2] === 0) {
            return;
          }

          setCurrentPosition((prev) => [
            prev[0] < mazeData.length ? prev[0] + 1 : prev[0],
            prev[1],
          ]);

          socket.emit('change-turn', { gameId });
          break;
        case 'ArrowUp':
          if (data[0] === 0) {
            return;
          }

          setCurrentPosition((prev) => [prev[0] > 0 ? prev[0] - 1 : prev[0], prev[1]]);

          socket.emit('change-turn', { gameId });
          break;
        case 'ArrowLeft':
          if (data[3] === 0) {
            return;
          }

          setCurrentPosition((prev) => [prev[0], prev[1] > 0 ? prev[1] - 1 : prev[1]]);

          socket.emit('change-turn', { gameId });
          break;
        case 'ArrowRight':
          if (data[1] === 0) {
            return;
          }

          setCurrentPosition((prev) => [
            prev[0],
            prev[1] < mazeData.length ? prev[1] + 1 : prev[1],
          ]);

          socket.emit('change-turn', { gameId });
          break;
      }
    },
    [currentPosition, currentTurnUser?.id, gameId, mazeData, user?.id, winner],
  );

  const beforeunload = useCallback((event: any) => {
    event.preventDefault();
    event.returnValue = '';
    return false;
  }, []);

  useEffect(() => {
    if (mazeData.length > 0 || !gameId) {
      return;
    }

    gamesService
      .getGame(gameId)
      .then((res) => {
        setMazeData(res.data.maze);
        setCurrentTurnUser(res.data.currentTurnUser ?? null);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          navigate('/');
        }
      });
  }, [gameId, mazeData.length, navigate, user?.id]);

  useEffect(() => {
    if (mazeData.length > 0) {
      window.addEventListener('keydown', handleMove);
    }

    return () => {
      window.removeEventListener('keydown', handleMove);
    };
  }, [handleMove, mazeData]);

  useEffect(() => {
    socket.on('change-turn', ({ currentTurnUser }) => {
      if (currentTurnUser) {
        setCurrentTurnUser(currentTurnUser);
      }
    });
  }, []);

  useEffect(() => {
    socket.on('game-over', ({ winner }) => {
      if (winner) {
        setWinner(winner);
      }
    });
  }, []);

  useEffect(() => {
    if (
      !(currentPosition[0] === mazeData.length - 1 && currentPosition[1] === mazeData.length - 1)
    ) {
      return;
    }

    if (user && gameId) {
      socket.emit('game-over', { gameId, winner: user });
    }
  }, [currentPosition, gameId, mazeData.length, user]);

  useEffect(() => {
    window.addEventListener('beforeunload', beforeunload);

    return () => {
      window.removeEventListener('beforeunload', beforeunload);
    };
  }, [beforeunload]);

  return { mazeData, currentPosition, currentTurnUser, user, winner };
};

export default useMaze;
