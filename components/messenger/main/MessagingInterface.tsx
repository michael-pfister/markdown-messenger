import { css } from '@emotion/react';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import { ContactInformation } from '../Layout';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Message } from './ChatHistory';
import { CurrencyYenTwoTone } from '@mui/icons-material';

const styles = {
  root: css`
    background-color: #f2f2f2;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `,

  preview: css`
    margin: 1em;
  `,

  messagingControls: css`
    width: 100%;
    background-color: #1e1e1e;
    display: flex;
    justify-content: center;
    align-content: center;
  `
}

export default function MessagingInterface(props: {
  selectedContact: ContactInformation;
}) {
  const [preview, setPreview] = useState('');

  return (
    <div css={styles.root} id='messaging-interface'>
        {preview.length ? <div css={styles.preview}><Message isBlue={true} message={preview} timestamp={new Date().toLocaleTimeString()} /></div> : null}
        <div css={styles.messagingControls}>
          <Editor
            defaultLanguage="html"
            height='10vh'
            theme='vs-dark'
            onChange={(value)=>{
              setPreview(value as string);
            }}
            value={preview}
          />
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
                // finish this
                if (response.status !== 200){
                  response.json().then((data)=>{
                    console.log(data);
                  });
                }else{
                  setPreview('');
                }});
          }}>
            <SendIcon />
          </IconButton>
        </div>
    </div>
  );
}
