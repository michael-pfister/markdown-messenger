import { css } from '@emotion/react';
import { Avatar, Card, CardContent } from '@mui/material';
import MuiMarkdown from 'mui-markdown';
import { useEffect } from 'react';
import { messageCluster } from '../../../utilities/database';

const chatHistoryStyles = css`
  height: calc(100vh - 60px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const localSenderId = 'd3kc4so2hw';

export default function ChatHistory() {
  // 💀
  useEffect(() => {
    const chatHistory = document.getElementById('chat-history');
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, []);

  return (
    <div css={chatHistoryStyles} id={`chat-history`}>
      {messageCluster.map((messageClusterItem) => {
        return (
          <div
            key={`ChatHistory_message_${messageClusterItem.id}`}
            css={css`
              margin: 50px 0;
              display: flex;
              gap: 10px;
              ${messageClusterItem.senderId === localSenderId
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
              alt={`profile picture ${messageClusterItem.senderId}`}
              src={
                messageClusterItem.senderId === localSenderId
                  ? `https://www.aroged.com/wp-content/uploads/2022/04/Hackers-stole-tokens-worth-about-3-million-from-NFT-monkey.jpg`
                  : `https://pbs.twimg.com/profile_images/1484604685671493632/nifvTODz_400x400.png`
              } // get corresponding Avatar from database
            />
            <Card
              css={css`
                color: white;
                max-width: 50%;
                ${messageClusterItem.senderId === localSenderId
                  ? `background-color: DodgerBlue;`
                  : `background-color: DimGray;`}
              `}
            >
              <CardContent>
                <MuiMarkdown>{messageClusterItem.message}</MuiMarkdown>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
