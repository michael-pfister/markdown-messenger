import { css } from '@emotion/react';
import { Grid, List } from '@material-ui/core';
import { Search } from '@mui/icons-material';
import { Alert, AlertColor, AlertTitle, ListItemButton } from '@mui/material';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';
import { useEffect, useState } from 'react';
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
  alert: {
    severity: AlertColor;
    message: string;
  };
  setMobileContactSelected?: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  return (
    <List css={chatListStyles}>
      {Object.keys(props.alert).length ? <Grid item xs={12}>
            <Alert severity={props.alert.severity}>
                <AlertTitle>{props.alert.severity}</AlertTitle>
                {props.alert.message}
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

              props.setMobileContactSelected && props.setMobileContactSelected(true);
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
