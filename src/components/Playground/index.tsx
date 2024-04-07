import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';

import usePlayground from './usePlayground';

const Playground = () => {
  const { games, isLoading, onCancelGame, onCreateNewGame, onJoinToGameGame } = usePlayground();

  return isLoading ? (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={3}
    >
      <CircularProgress />
      <Button variant="contained" color="error" onClick={onCancelGame}>
        Cancel
      </Button>
    </Box>
  ) : (
    <Box display="flex">
      <>
        <Box width={400} height="100vh" bgcolor="lightblue">
          <Typography textAlign="center" py={2} fontSize={20}>
            Games
          </Typography>
          <Stack spacing={1} px={2}>
            {games.map((game) => (
              <Box
                key={game.id}
                display="flex"
                justifyContent="space-between"
                bgcolor="lightcyan"
                p={1}
                borderRadius={1}
              >
                <Typography>{game.owner?.username} are waiting...</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onJoinToGameGame(game.id)}
                >
                  <Typography fontSize={12}>Join to game</Typography>
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box display="flex" flexGrow={1} alignItems="center" justifyContent="center">
          <Button variant="contained" color="primary" onClick={onCreateNewGame}>
            <Typography fontSize={15}>Start new Game</Typography>
          </Button>
        </Box>
      </>
    </Box>
  );
};

export default Playground;
