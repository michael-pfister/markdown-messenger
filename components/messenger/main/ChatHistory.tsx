import { css } from '@emotion/react';
import { Grid } from '@material-ui/core';
import { PeopleSharp } from '@mui/icons-material';
import { Alert, AlertTitle, Avatar, Card, CardContent } from '@mui/material';
import MuiMarkdown from 'mui-markdown';
import { useEffect, useState } from 'react';
import { messageCluster } from '../../../utilities/database';
import { ContactInformation } from '../Layout';
import { ChatHistoryElement } from './Chat';

const chatHistoryStyles = css`
  height: calc(100vh - 0);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

export default function ChatHistory(props: {
  selectedContact: ContactInformation, 
  chatHistory: Array<ChatHistoryElement>,
  localAvatarURL: string,
  contactAvatarURL: string,
  messagingInterfaceHeight: number
}) {
  
  // 💀
  useEffect(() => {
    const chatHistory = document.getElementById('chat-history');
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, []);

  return (
    <div css={css`
    height: calc(100vh - ${props.messagingInterfaceHeight}px);
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 0px;
    }
  `} id={`chat-history`}>
      {props.chatHistory && props.chatHistory.map((chatHistoryElement) => {
        return (
          <div
            key={`ChatHistory_message_${chatHistoryElement.email}_${chatHistoryElement.created_at}`}
            css={css`
              margin: 50px 0;
              display: flex;
              gap: 10px;
              ${chatHistoryElement.email !== props.selectedContact.email
                ? `justify-content: right;
                  flex-direction: row-reverse;
                  padding-right: 10px;
                `
                : `justify-content: left;
                padding-left: 10px;
                `}
            `}
          >
            <Avatar
              alt={`profile picture ${chatHistoryElement.email}`}
              src={
                chatHistoryElement.email !== props.selectedContact.email
                  ? props.localAvatarURL
                  : props.contactAvatarURL
              } // get corresponding Avatar from database
            />
            <Card
              css={css`
                color: white;
                max-width: 50%;
                ${chatHistoryElement.email !== props.selectedContact.email
                  ? `background-color: DodgerBlue;`
                  : `background-color: DimGray;`}
              `}
            >
              <CardContent>
                <MuiMarkdown>{chatHistoryElement.message}</MuiMarkdown>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
