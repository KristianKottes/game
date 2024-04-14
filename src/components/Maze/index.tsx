import { Box, Button, Dialog, InputAdornment, TextField, Typography } from '@mui/material';
import moment from 'moment';
import React, { useMemo } from 'react';

import useMaze from './useMaze';

import './styles.css';

const Maze = () => {
  const {
    mazeData,
    currentPosition,
    currentTurnUser,
    user,
    winner,
    messages,
    message,
    giveUpModalOpen,
    onMessageSend,
    onMessageChange,
    onGiveUpModalToggle,
    navigateToDashboard,
    onGiveUp,
  } = useMaze();

  const Children = useMemo(
    () => (
      <tbody>
        {mazeData.map((item, i) => {
          return (
            <>
              <tr></tr>
              <tr key={i}>
                {item.map((_elem, j) => {
                  const style: Record<string, string> = {};

                  if (mazeData[i][j][0] === 0) {
                    style['borderTop'] = '2px solid black';
                  }
                  if (mazeData[i][j][1] === 0) {
                    style['borderRight'] = '2px solid black';
                  }
                  if (mazeData[i][j][2] === 0) {
                    style['borderBottom'] = '2px solid black';
                  }
                  if (mazeData[i][j][3] === 0) {
                    style['borderLeft'] = '2px solid black';
                  }
                  if (i === 0 && j === 0) {
                    style['borderLeft'] = '2px solid skyblue';
                  }

                  if (i === mazeData.length - 1 && j === mazeData.length - 1) {
                    style['borderRight'] = '2px solid skyblue';
                  }

                  if (
                    [i, i - 1, i + 1].includes(currentPosition[0]) &&
                    [j, j - 1, j + 1].includes(currentPosition[1])
                  ) {
                    style['backgroundColor'] = 'transparent';
                    style['borderColor'] = 'black';
                  } else {
                    style['backgroundColor'] = 'lightblue';
                    style['borderColor'] = 'lightblue';
                  }

                  return (
                    <td key={i - j} style={style}>
                      {currentPosition[0] === i && currentPosition[1] === j && (
                        <Box className="positionBlockContainer">
                          <Box className="positionBlock"></Box>
                        </Box>
                      )}
                    </td>
                  );
                })}
              </tr>
            </>
          );
        })}
      </tbody>
    ),
    [mazeData, currentPosition],
  );

  const Title = useMemo(
    () => (
      <Typography className="title">
        {user?.id === currentTurnUser?.id ? 'Youth turn' : `${currentTurnUser?.username}'s turn`}
      </Typography>
    ),
    [currentTurnUser, user?.id],
  );

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
          {Title}
          <table id="maze">{Children}</table>
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
      <Box
        display="flex"
        flexDirection="column"
        width={350}
        height="100vh"
        bgcolor="lightblue"
        paddingX={1}
      >
        <Typography textAlign="center" py={2} fontSize={20}>
          Messages
        </Typography>
        <Box flexGrow={1} overflow="auto">
          {messages.map((message, index) => (
            <Typography key={index}>
              [{moment(message.created_at).format('HH:mm:ss DD-MM-YYYY')}] {message.sender.username}
              : {message.text}
            </Typography>
          ))}
        </Box>
        <TextField
          fullWidth
          label="Message"
          name="message"
          size="small"
          value={message}
          onChange={onMessageChange}
          background-color="white"
          InputProps={{
            style: { paddingRight: 0 },
            endAdornment: (
              <InputAdornment position="end">
                <Button color="primary" variant="contained" onClick={() => onMessageSend()}>
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
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

export default Maze;
