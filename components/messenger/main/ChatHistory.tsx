import { css } from '@emotion/react';
import { Grid } from '@material-ui/core';
import { PeopleSharp } from '@mui/icons-material';
import { Alert, AlertTitle, Avatar, Card, CardContent } from '@mui/material';
import MuiMarkdown from 'mui-markdown';
import { useEffect, useState } from 'react';
import { ContactInformation } from '../Layout';
import { ChatHistoryElement } from './Chat';

const chatHistoryStyles = css`
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
  const [height, setHeight] = useState(0);
  
  useEffect(()=>{
    const messagingInterfaceObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setHeight(window.innerHeight - entry.contentRect.height - 33);
      });
    });

    messagingInterfaceObserver.observe(document.getElementById('messaging-interface') as HTMLElement);
  }, []);

  // 💀
  useEffect(() => {
    const chatHistory = document.getElementById('chat-history');
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, [props.chatHistory]);

  return (
    <div css={css`${chatHistoryStyles} height: ${height}px;`} id={`chat-history`}>
      {props.chatHistory instanceof Array && props.chatHistory.map((chatHistoryElement) => {
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
                overflow: auto;

                ${chatHistoryElement.email !== props.selectedContact.email
                  ? `background-color: DodgerBlue;`
                  : `background-color: #454545;`}
              `}
            >
              <CardContent>
                <MuiMarkdown>{chatHistoryElement.message}</MuiMarkdown>
                <br/><br/>
                {new Date(chatHistoryElement.created_at).toDateString()}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
