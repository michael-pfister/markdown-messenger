import { css } from '@emotion/react';
import ChatHistory from './ChatHistory';
import MessagingInterface from './MessagingInterface';

const chatStyles = css`
  width: 100%;
  height: 100vh;
  background-image: url('https://c.pxhere.com/images/eb/0b/6c5f4bb5f46423d124737477c467-1594712.jpg!d');
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;

  & > * {
    width: 100%;
  }
`;

export default function Chat() {
  return (
    <div css={chatStyles}>
      <ChatHistory />
      <MessagingInterface />
    </div>
  );
}
