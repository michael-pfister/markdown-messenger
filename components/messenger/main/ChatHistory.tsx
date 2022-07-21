import { css } from '@emotion/react';
import { Avatar, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { ContactInformation } from '../Layout';
import { ChatHistoryElement } from './Chat';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const chatHistoryStyles = css`
  overflow-y: scroll;
`;

const markdownStyles = css`
  display: flex;
  flex-wrap: wrap;
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
        setHeight(window.innerHeight - entry.contentRect.height);
      });
    });

    messagingInterfaceObserver.observe(document.getElementById('messaging-interface') as HTMLElement);
  }, []);

  useEffect(() => {
    setHeight(window.innerHeight - (document.getElementById('messaging-interface') as HTMLElement).clientHeight);
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
              flex-wrap: wrap;
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
                <ReactMarkdown 
                  rehypePlugins={[rehypeRaw]} 
                  css={css`
                  ${markdownStyles} 
                  & > * {
                    width: ${document.getElementById('chat-history')?.clientWidth};
                  }
                `}>
                  {chatHistoryElement.message}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
