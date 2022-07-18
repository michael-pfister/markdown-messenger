import { css } from '@emotion/react';
import { Alert, AlertColor, AlertTitle, Autocomplete, IconButton, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { checkWindowSize } from '../landingPage/ResponsiveAppBar';
import ContactList from './header/ContactList';
import LinkActionInterface from './header/LinkActionInterface';
import Chat from './main/Chat';
import MessagingInterface from './main/MessagingInterface';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

const mobileReturnStyles = css`
  margin: 1em;
  position: absolute;
`;

export default function Layout() {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [contacts, setContacts] = useState([] as Array<ContactInformation>);
  const [mobile, setMobile] = useState(false);
  const [mobileContactSelected, setMobileContactSelected] = useState(true);
  const [alert, setAlert] = useState({} as { severity: AlertColor; message: string});
  
  useEffect(()=>{
    window.addEventListener("resize", ()=>{checkWindowSize(setMobile)});
    checkWindowSize(setMobile);
  }, []);

  useEffect(()=>{
    fetch('/api/contacts', {
      method: 'GET'
    }).then((response)=>{
       response.json().then((data)=>{
        if(response.status === 200){
          setContacts(data);
        }else{
          setAlert({message: data, severity: 'error'});
        }
      });
    });
  },[]);

  if (mobile){
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
            <ContactList search={search} setSearch={setSearch} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} contacts={contacts} alert={alert}/>
            <LinkActionInterface />
          </header>
          <main>
            <Chat selectedContact={contacts[selectedIndex]}/>
          </main>
        </div>
        <MessagingInterface selectedContact={contacts[selectedIndex]}/>
      </div>
    ); 
  }else{
    if (mobileContactSelected){
      return <main>
        <div css={mobileReturnStyles}>
          <IconButton color="primary" aria-label="return back to contacts" onClick={()=>{setMobileContactSelected(false)}}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <Chat selectedContact={contacts[selectedIndex]}/>
        <MessagingInterface selectedContact={contacts[selectedIndex]}/>
      </main>;
    }else{
      return <header>
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
        <ContactList search={search} setSearch={setSearch} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} contacts={contacts} alert={alert} setMobileContactSelected={setMobileContactSelected}/>
        <LinkActionInterface />
      </header>;
    }
  }
}
