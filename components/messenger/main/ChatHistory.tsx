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

  & > * {
    max-width: 100%;
    margin: 1rem;
  }

  img, iframe{
    margin: 0 0 1em 0;
  }

`;

const timeStampStyles = css`
  margin: 2em 0;
  width: 100%;
  text-align: center;
  color: grey;
`;

const TimeStamp = ({date}:{date: Date;}) => {
  return <div css={timeStampStyles}>{date.toDateString()}</div>;
} 

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
      {props.chatHistory instanceof Array && props.chatHistory.map((chatHistoryElement, index) => {
        return (
          <div key={`ChatHistory_element_${chatHistoryElement.email}_${chatHistoryElement.created_at}`}>
            {
              (index === 0 || new Date(chatHistoryElement.created_at).toDateString() !== new Date(props.chatHistory[index	- 1].created_at).toDateString()) ? <TimeStamp date={new Date(chatHistoryElement.created_at)} /> : null
            }
            <div
              css={css`
                margin: 50px 0;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                ${chatHistoryElement.email !== props.selectedContact.email
                  ? `justify-content: right;
                    flex-direction: row-reverse;
                    padding-right: 10px;
                    margin-left: 1rem;
                  `
                  : `justify-content: left;
                  padding-left: 10px;
                  margin-right: 1rem;
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
              <div
                css={css`
                  color: white;
                  overflow: auto;
                  border-radius: 10px;

                  .messageTime{
                    margin: 0 1em 1em 1em;
                    filter: opacity(0.5);
                  }

                  ${chatHistoryElement.email !== props.selectedContact.email
                    ? `background-color: DodgerBlue;`
                    : `background-color: #454545;`}
                `}
              >
                <ReactMarkdown 
                  rehypePlugins={[rehypeRaw]} 
                  css={markdownStyles}
                >
                  {chatHistoryElement.message}
                </ReactMarkdown>
                <p className='messageTime'>{new Date(chatHistoryElement.created_at).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
