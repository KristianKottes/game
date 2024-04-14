import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuthContext } from '../../context';
import { gamesService, messagesService } from '../../services';
import { IGame, IUser } from '../../types';
import { IPopulatedMessage } from '../../types/message.interface';
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
  const [messages, setMessages] = useState<IPopulatedMessage[]>([]);
  const [message, setMessage] = useState('');
  const [currentMessage, setCurrentMessage] = useState<IPopulatedMessage | null>(null);
  const [game, setGame] = useState<IGame | null>(null);
  const [command, setCommand] = useState<string | null>(null);
  const [giveUpModalOpen, setGiveUpModalOpen] = useState(false);

  const [winner, setWinner] = useState<IUser | null>(null);

  const { gameId } = useParams();

  const navigateToDashboard = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const onGiveUpModalToggle = useCallback(() => {
    setGiveUpModalOpen((prev) => !prev);
  }, []);

  const onMessageChange = useCallback((e: any) => {
    setMessage(e?.target?.value ?? '');
  }, []);

  const onMessageSend = useCallback(
    (text?: string) => {
      if ((!text && !message) || !game || !user) {
        return;
      }

      if (['/up', '/right', '/down', '/left'].includes(message.toLowerCase())) {
        setCommand(message.toLowerCase());
        setMessage('');
        return;
      }

      const recipient_id = game.owner_id === user.id ? game.member_id : game.owner_id;

      socket.emit('send-message', {
        text: text || message,
        sender_id: user.id,
        recipient_id,
        game_id: game.id,
      });

      setMessage('');
    },
    [game, message, user],
  );

  const onGiveUp = useCallback(() => {
    setGiveUpModalOpen(false);
    onMessageSend(`Player ${user?.username} gave up`);

    socket.emit('gave-up', { game_id: gameId, loser_id: user?.id });
  }, [gameId, onMessageSend, user]);

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

          onMessageSend('Going down');

          socket.emit('change-turn', { gameId });
          break;
        case 'ArrowUp':
          if (data[0] === 0) {
            return;
          }

          setCurrentPosition((prev) => [prev[0] > 0 ? prev[0] - 1 : prev[0], prev[1]]);

          onMessageSend('Going up');

          socket.emit('change-turn', { gameId });
          break;
        case 'ArrowLeft':
          if (data[3] === 0) {
            return;
          }

          setCurrentPosition((prev) => [prev[0], prev[1] > 0 ? prev[1] - 1 : prev[1]]);

          onMessageSend('Going left');

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

          onMessageSend('Going right');

          socket.emit('change-turn', { gameId });
          break;
      }
    },
    [currentPosition, currentTurnUser?.id, gameId, mazeData, onMessageSend, user?.id, winner],
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
        setGame(res.data);
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
    socket.on('sent-message', (message) => {
      setCurrentMessage(message);
    });

    if (currentMessage && !messages.find((m) => m.id === currentMessage.id)) {
      setMessages((prev) => [...prev, currentMessage]);
    }

    setCurrentMessage(null);
  }, [currentMessage, messages]);

  useEffect(() => {
    socket.on('gave-up', (winner) => {
      setWinner(winner);
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

      onMessageSend(`Player ${user.username} has won!`);
    }
  }, [currentPosition, gameId, mazeData.length, onMessageSend, user]);

  useEffect(() => {
    window.addEventListener('beforeunload', beforeunload);

    return () => {
      window.removeEventListener('beforeunload', beforeunload);
    };
  }, [beforeunload]);

  useEffect(() => {
    if (gameId) {
      messagesService.getMessages(gameId).then(({ data }) => {
        setMessages(data);
      });
    }
  }, [gameId]);

  useEffect(() => {
    if (command && ['/up', '/right', '/down', '/left'].includes(command)) {
      switch (command) {
        case '/up':
          handleMove({ key: 'ArrowUp' });
          setCommand(null);
          break;
        case '/right':
          handleMove({ key: 'ArrowRight' });
          setCommand(null);
          break;
        case '/down':
          handleMove({ key: 'ArrowDown' });
          setCommand(null);
          break;
        case '/left':
          handleMove({ key: 'ArrowLeft' });
          setCommand(null);
          break;
      }
    }
  }, [command, handleMove]);

  return {
    mazeData,
    currentPosition,
    currentTurnUser,
    user,
    winner,
    message,
    messages,
    giveUpModalOpen,
    onMessageSend,
    onMessageChange,
    onGiveUpModalToggle,
    navigateToDashboard,
    onGiveUp,
  };
};

export default useMaze;
