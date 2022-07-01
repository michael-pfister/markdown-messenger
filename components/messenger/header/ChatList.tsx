import { css } from '@emotion/react';
import { List } from '@material-ui/core';
import { Search } from '@mui/icons-material';
import { ListItemButton } from '@mui/material';
import { useState } from 'react';
import { ChatList as DatabaseChatList } from '../../../utilities/database';
import ChatListItem from './ChatListItem';

const chatListStyles = css`
  h2 {
    font-weight: normal;
    color: deepskyblue;
    margin: 0;
    padding: 8px 16px;
  }
`;

const chatListItemStyles = css`
  padding: 0;
`;

export default function ChatList(props: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedIndex, setSelectedIndex] = useState('0');
  return (
    <List css={chatListStyles}>
      {DatabaseChatList.filter(({ name }) => {
        return props.search === ''
          ? true
          : name.toLowerCase().includes(props.search.toLowerCase());
      }).map((chatListItem) => {
        return (
          <ListItemButton
            key={`ChatListItem_${chatListItem.id}`}
            css={chatListItemStyles}
            selected={selectedIndex === chatListItem.id}
            onClick={() => {
              setSelectedIndex(chatListItem.id);
              props.setSearch('');
            }}
          >
            <ChatListItem
              id={chatListItem.id}
              avatar={chatListItem.avatar}
              name={chatListItem.name}
              lastMessage={chatListItem.lastMessage}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}
