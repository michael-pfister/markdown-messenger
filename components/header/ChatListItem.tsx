import { css } from '@emotion/react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { ChatListItemData } from '../../utilities/database';

const chatListItemStyles = css`
  cursor: pointer;

  :hover {
    background-color: gainsboro;
  }
`;

export default function ChatListItem(props: ChatListItemData) {
  return (
    <ListItem css={chatListItemStyles}>
      <ListItemAvatar>
        <Avatar alt="profile picture" src={props.avatar} />
      </ListItemAvatar>
      <ListItemText primary={props.name} secondary={props.lastMessage} />
    </ListItem>
  );
}
