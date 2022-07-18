import { css } from '@emotion/react';
import { Alert, AlertTitle, Autocomplete, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { checkWindowSize } from '../landingPage/ResponsiveAppBar';
import ContactList from './header/ContactList';
import LinkActionInterface from './header/LinkActionInterface';
import Chat from './main/Chat';
import MessagingInterface from './main/MessagingInterface';

export type ContactInformation = {
  email: string;
  latestMessage: string;
  settings: { 
    avatarURL: string;
    name: string;
    status: boolean;
  };
}

const rotatePhoneStyles = css`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const LayoutStyles = css`
  display: flex;

  header {
    border-right: 1px solid lightgray;
  }

  main {
    width: 100%;
  }
`;

const searchStyles = css`
  width: 100%;
  color: white;
`;

export default function Layout() {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [contacts, setContacts] = useState([] as Array<ContactInformation>);
  const [mobile, setMobile] = useState(false);
  
  useEffect(()=>{
    window.addEventListener("resize", ()=>{checkWindowSize(setMobile)});
    checkWindowSize(setMobile);
  }, []);

  if (!mobile){
    return <div css={rotatePhoneStyles}>
      <Image src='/images/turnYourPhone.gif' alt='please turn your phone by 90 degrees' width="498px" height="473px"/>
    </div>;
  }else{
    return (
      <div>
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
            <ContactList search={search} setSearch={setSearch} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} contacts={contacts} setContacts={setContacts}/>
            <LinkActionInterface />
          </header>
          <main>
            <Chat selectedContact={contacts[selectedIndex]}/>
          </main>
        </div>
        <MessagingInterface selectedContact={contacts[selectedIndex]}/>
      </div>
    );
  }
}
