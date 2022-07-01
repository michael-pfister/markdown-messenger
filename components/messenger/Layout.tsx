import { css } from '@emotion/react';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { ChatList as DatabaseChatList } from '../../utilities/database';
import ChatList from './header/ChatList';
import Chat from './main/Chat';

const LayoutStyles = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ghostwhite;

  header {
    border-right: 1px solid lightgray;
    width: 40%;
  }

  main {
    width: 100%;
    height: 100vh;
  }
`;

const searchStyles = css`
  width: 100%;
`;

export default function Layout() {
  const [search, setSearch] = React.useState('');

  return (
    <div css={LayoutStyles}>
      <header>
        <TextField
          css={searchStyles}
          id="filled-basic"
          label="🔍︎ Search Contacts"
          variant="filled"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <ChatList search={search} setSearch={setSearch} />
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}
