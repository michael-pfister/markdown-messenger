import { css } from '@emotion/react';
import { Grid } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import Editor from "@monaco-editor/react";
import MuiMarkdown from 'mui-markdown';
import { ContactInformation } from '../Layout';

const styles = {
  root: css`
    background-color: ghostwhite;
    padding: 10px;
  `,

  preview: css`
    padding: 10px;
    max-height: 40vh;
    width: 1px; // ? solves overflow issue 
    overflow: hidden;
    background-color: dodgerblue;
    color: white;
  `,

  messagingControls: css`
    display: flex;
    justify-content: center;
    align-content: center;
  `
}

export default function MessagingInterface(props: {
  selectedContact: ContactInformation;
  setMessagingInterfaceHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [preview, setPreview] = useState('');

  return (
    <div css={styles.root} id='messaging-interface'>
      <Grid container>
        <Grid item xs={6}>
          <Editor
            defaultLanguage="html"
            height='40vh'
            defaultValue={`<!--write your message here-->\n`}
            onChange={(value)=>{
              setPreview(value as string);
            }}
          />
        </Grid>
        <Grid item xs={5} css={styles.preview}>
          <MuiMarkdown>{preview}</MuiMarkdown>
        </Grid>
        <Grid item xs={1} css={styles.messagingControls}>
          <IconButton color="primary" aria-label="send message" component="span" onClick={()=>{
            props.selectedContact && fetch('/api/messages', {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                target: props.selectedContact.email,
                message: preview
              })})
              .then((response)=>{
                // finishn this
                if (response.status !== 200){
                  response.json().then((data)=>{
                    console.log(data);
                  });
                }});
          }}>
            <SendIcon />
          </IconButton>
        </Grid>  
      </Grid>
    </div>
  );
}
