import { Box, Dialog, Typography } from '@mui/material';
import React, { useMemo } from 'react';

import useMaze from './useMaze';

import './styles.css';

const Maze = () => {
  const { mazeData, currentPosition, currentTurnUser, user, winner } = useMaze();

  const Children = useMemo(
    () => (
      <tbody>
        {mazeData.map((item, i) => {
          return (
            <>
              <tr></tr>
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
                  style['background-color'] = 'transparent';
                  style['border-color'] = 'black';
                } else {
                  style['background-color'] = 'lightblue';
                  style['border-color'] = 'lightblue';
                }

                return (
                  <td style={style}>
                    {currentPosition[0] === i && currentPosition[1] === j && (
                      <Box className="positionBlockContainer">
                        <Box className="positionBlock"></Box>
                      </Box>
                    )}
                  </td>
                );
              })}
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

  const ModalTitle = useMemo(
    () => (
      <Typography className="name">
        {winner?.id === user?.id ? 'You won!' : `${winner?.username} won!`}
      </Typography>
    ),
    [user?.id, winner],
  );

  return (
    <div className="mazeWrapper">
      {Title}
      <table id="maze">{Children}</table>
      <Dialog open={!!winner}>{ModalTitle}</Dialog>
    </div>
  );
};

export default Maze;
