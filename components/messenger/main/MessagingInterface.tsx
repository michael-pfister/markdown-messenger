import { css } from '@emotion/react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import GifIcon from '@mui/icons-material/Gif';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, TextField } from '@mui/material';

const messagingInterfaceStyles = css`
  width: 100%;
  padding: 10px;
  background-color: ghostwhite;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const textFieldStyles = css`
  width: 80%;
`;

export default function MessagingInterface() {
  return (
    <div css={messagingInterfaceStyles}>
      <TextField
        css={textFieldStyles}
        size="small"
        label="type message here ..."
        multiline
      />
      <IconButton color="primary" aria-label="attach a gif" component="span">
        <GifIcon />
      </IconButton>
      <IconButton color="primary" aria-label="attach a file" component="span">
        <AttachFileIcon />
      </IconButton>
      <IconButton color="primary" aria-label="send message" component="span">
        <SendIcon />
      </IconButton>
    </div>
  );
}
