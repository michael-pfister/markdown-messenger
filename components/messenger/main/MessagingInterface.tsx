import { css } from '@emotion/react';
import { Box, Card, CardContent, Grid } from '@material-ui/core';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import GifIcon from '@mui/icons-material/Gif';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import MuiMarkdown from 'mui-markdown';

const styles = {
  root: css`
    background-color: ghostwhite;
  `,

  preview: css`
    padding: 10px;
    width: 100%;
  `,

  messagingControls: css`
    padding: 10px;
    display: flex;
    justify-content: space-evenly;
  `,

  textfield: css`
    width: 100%;
  `
}

const messagingInterfaceStyles = css`
  padding: 10px;
  background-color: ghostwhite;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const textFieldStyles = css`
  width: 90%;
`;

export default function MessagingInterface(props: {
  setMessagingInterfaceHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [preview, setPreview] = useState('');

  return (
    <div css={styles.root} id='messaging-interface'>
      <Grid container>
        <Grid item xs={12} css={styles.messagingControls}>
          <TextField
            css={styles.textfield}
            size="small"
            label="type message here ..."
            onChange={(event)=>{
              setPreview(event.target.value);
              props.setMessagingInterfaceHeight(document.getElementById('messaging-interface')?.offsetHeight as number);
              console.log(document.getElementById('messaging-interface')?.offsetHeight as number);
            }}
            multiline
          />
          <IconButton color="primary" aria-label="send message" component="span">
            <SendIcon />
          </IconButton>
        </Grid>
        <Grid item xs={8} css={styles.preview}>
          {/* <Card>
            <CardContent> */}
              <p>Preview</p>
              <MuiMarkdown>{preview}</MuiMarkdown>
            {/* </CardContent>
          </Card> */}
        </Grid>
      </Grid>
    </div>
  );
}
