import { css } from '@emotion/react';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import { ContactInformation } from '../Layout';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const styles = {
  root: css`
    background-color: #1e1e1e;
  `,

  preview: css`
    padding: 1em;
    max-height: 40vh;
    overflow: auto;
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
}) {
  const [preview, setPreview] = useState('');

  return (
    <div css={styles.root} id='messaging-interface'>
        {preview.length ? <div css={styles.preview}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{preview}</ReactMarkdown>
        </div> : null}
        <div css={styles.messagingControls}>
          <Editor
            defaultLanguage="html"
            height='10vh'
            theme='vs-dark'
            onChange={(value)=>{
              setPreview(value as string);
            }}
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
                // finishn this
                if (response.status !== 200){
                  response.json().then((data)=>{
                    console.log(data);
                  });
                }});
          }}>
            <SendIcon />
          </IconButton>
        </div>
    </div>
  );
}
