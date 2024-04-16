import { Typography } from '@mui/material';

import { ITitleProps } from './types';

const Title = ({ userId, currentTurnUser }: ITitleProps) => (
  <Typography className="title">
    {userId === currentTurnUser?.id ? 'Youth turn' : `${currentTurnUser?.username}'s turn`}
  </Typography>
);

export default Title;
