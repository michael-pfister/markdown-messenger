import { css } from '@emotion/react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

type ChatListItemData = {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  selected: boolean;
};

const chatListItemStyles = css`
  :hover {
    background-color: gainsboro;
  }
`;

export default function ContactListItem(props: ChatListItemData) {
  return (
    <ListItem css={chatListItemStyles} selected={props.selected}>
      <ListItemAvatar>
        <Avatar alt="profile picture" src={props.avatar} />
      </ListItemAvatar>
      <ListItemText primary={props.name} secondary={props.lastMessage.length > 70 ? props.lastMessage.slice(0, 70)+'...' : props.lastMessage} />
    </ListItem>
  );
}
