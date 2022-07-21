import { css } from '@emotion/react';
import { Avatar, Card, CardContent } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ContactInformation } from '../Layout';
import { ChatHistoryElement } from './Chat';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const chatHistoryStyles = css`
  overflow-y: scroll;
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

export const markdownStyles = css`
  & > * {
    max-width: 300px;
    margin: 1rem 1rem 0 1rem;
  }

  img, iframe{
    margin: 0;
    border: 0;
  }

  iframe{
    max-width: 100%;
    max-height: 500px;
  }
`;

export const Message = (props: {isBlue: boolean; message: string; timestamp: string}) => {
  return <div
    css={css`
      color: white;
      overflow: auto;
      border-radius: 10px;

      .messageTime{
        margin: 1em;
        filter: opacity(0.5);
      }

      ${props.isBlue
        ? `background-color: DodgerBlue;`
        : `background-color: #454545;`}
    `}
  >
    <ReactMarkdown 
      rehypePlugins={[rehypeRaw]} 
      css={markdownStyles}
    >
      {props.message}
    </ReactMarkdown>
    <p className='messageTime'>{props.timestamp}</p>
  </div>;
}

const updateHeight = async (setHeight: Dispatch<SetStateAction<number>>, chatHistory: HTMLElement, entry: ResizeObserverEntry) => {
  await setHeight(window.innerHeight - entry.contentRect.height);
  await setTimeout(()=>{chatHistory.scrollTop = chatHistory.scrollHeight}, 0);
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
    const chatHistory = document.getElementById('chat-history') as HTMLElement;
    const messagingInterfaceObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        updateHeight(setHeight, chatHistory, entry);
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
              <Message isBlue={chatHistoryElement.email !== props.selectedContact.email} message={chatHistoryElement.message} timestamp={new Date(chatHistoryElement.created_at).toLocaleTimeString()}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}
