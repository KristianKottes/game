import { Box, Button, Typography, Dialog } from '@mui/material';
import React from 'react';

import { Maze } from '../../components';

import { Chat, Title } from './components';
import useGame from './useGame';

const Game = () => {
  const {
    mazeData,
    currentPosition,
    winner,
    message,
    messages,
    giveUpModalOpen,
    currentTurnUser,
    user,
    onGiveUpModalToggle,
    navigateToDashboard,
    onMessageChange,
    onMessageSend,
    onGiveUp,
  } = useGame();

  return (
    <Box display="flex">
      <Box
        display="flex"
        flexGrow={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Title userId={user?.id} currentTurnUser={currentTurnUser} />
          <Maze mazeData={mazeData} currentPosition={currentPosition} />
          <Box display="flex" justifyContent="space-around" marginTop={1}>
            <Button variant="contained" disabled={!!winner} onClick={onGiveUpModalToggle}>
              Give up
            </Button>
            <Button variant="contained" disabled={!winner} onClick={navigateToDashboard}>
              Exit
            </Button>
          </Box>
        </Box>
      </Box>
      <Chat
        message={message}
        messages={messages}
        onMessageChange={onMessageChange}
        onMessageSend={onMessageSend}
      />
      <Dialog open={giveUpModalOpen} onClose={onGiveUpModalToggle}>
        <Box padding={2}>
          <Typography variant="h5">Are you sure?</Typography>
          <Box display="flex" justifyContent="space-around" marginTop={1}>
            <Button variant="contained" onClick={onGiveUp}>
              Yes
            </Button>
            <Button variant="contained" onClick={onGiveUpModalToggle}>
              No
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Game;
