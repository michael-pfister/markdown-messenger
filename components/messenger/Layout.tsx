import { css } from '@emotion/react';
import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';
import { ChatList as DatabaseChatList } from '../../utilities/database';
import ChatList from './header/ChatList';
import Chat from './main/Chat';

export type ContactInformation = {
  email: string;
  latestMessage: string;
  settings: { 
    avatarURL: string;
    name: string;
    status: boolean;
  };
}

const LayoutStyles = css`
  width: 100vw;
  height: 100vh;
  display: flex;

  header {
    border-right: 1px solid lightgray;
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
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [contacts, setContacts] = useState([] as Array<ContactInformation>);

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
        <ChatList search={search} setSearch={setSearch} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} contacts={contacts} setContacts={setContacts}/>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}
