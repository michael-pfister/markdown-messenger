import { css } from '@emotion/react';
import { Grid, List } from '@material-ui/core';
import { Search } from '@mui/icons-material';
import { Alert, AlertTitle, ListItemButton } from '@mui/material';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';
import { useEffect, useState } from 'react';
import { ChatList as DatabaseChatList } from '../../../utilities/database';
import { ContactInformation } from '../Layout';
import ContactListItem from './ContactListItem';

const chatListStyles = css`
  h2 {
    font-weight: normal;
    color: deepskyblue;
    margin: 0;
    padding: 8px 16px;
  }
`;

const chatListButtonStyles = css`
  cursor: pointer;
  padding: 0;
`;

export default function ContactList(props: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  contacts: Array<ContactInformation>;
  setContacts: React.Dispatch<React.SetStateAction<Array<ContactInformation>>>;
}) {
  const [alert, setAlert] = useState({} as {[key: string]: any;});

  useEffect(()=>{
    fetch('/api/contacts', {
      method: 'GET'
    }).then((response)=>{
       response.json().then((data)=>{
        if(response.status === 200){
          props.setContacts(data);
        }else{
          setAlert({message: data, severity: 'error'});
        }
      });
    });
  },[]);

  return (
    <List css={chatListStyles}>
      {Object.keys(alert).length ? <Grid item xs={12}>
            <Alert severity={alert.severity}>
                      <AlertTitle>{alert.severity}</AlertTitle>
                      {alert.message}
                  </Alert>
            </Grid> : null}
      {props.contacts.filter(({ settings }) => {
        return props.search === ''
          ? true
          : settings.name.toLowerCase().includes(props.search.toLowerCase());
      }).map((contact, index) => {
        return (
          <ListItemButton
            key={`ChatListItem_${index}`}
            css={chatListButtonStyles}
            selected={props.selectedIndex === index}
            onClick={() => {
              props.setSelectedIndex(props.contacts.indexOf(contact));
              props.setSearch('');
            }}
          >
            <ContactListItem
              id={String(index)}
              avatar={contact.settings.avatarURL}
              name={contact.settings.name}
              lastMessage={contact.latestMessage}
              selected={props.selectedIndex === index}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}
