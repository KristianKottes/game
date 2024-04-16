import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import moment from 'moment';

import { IChatProps } from './types';

const Chat = ({ message, messages, onMessageChange, onMessageSend }: IChatProps) => (
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
          [{moment(message.created_at).format('HH:mm:ss DD-MM-YYYY')}] {message.sender.username}:{' '}
          {message.text}
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
);

export default Chat;
