import { Box } from '@mui/material';
import React from 'react';

import './styles.css';
import { IMazeProps } from './types';

const Maze = ({ mazeData, currentPosition }: IMazeProps) => (
  <table id="maze">
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
  </table>
);

export default Maze;
