import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { ContactInformation } from '../Layout';
import ChatHistory from './ChatHistory';
import MessagingInterface from './MessagingInterface';
import jwt_decode from 'jwt-decode';
import { JwtPayload } from '../../../pages/api/contacts';

export type ChatHistoryElement = {
  created_at: string;
  email: string;
  message: string;
}

const chatStyles = css`
  width: 100%;
  height: 100vh;
  //background-color: #1c1c1c;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;

  background-image: url('/images/minimal-chat-wallpaper.jpg');
  background-size: auto;
  background-position: center;
  background-position-y: -80vh;
  background-repeat: no-repeat;

  & > * {
    width: 100%;
  }
`;


let myInterval: NodeJS.Timer;
let previousData: Array<ChatHistoryElement> = [];

export default function Chat(props: {selectedContact: ContactInformation}) {
  const [chatHistory, setChatHistory] = useState([] as Array<ChatHistoryElement>);
  const [localAvatarURL, setLocalAvatarURL] = useState('/images/default-profile-image.png');
  const [contactAvatarURL, setContactAvatarURL] = useState('/images/default-profile-image.png');
  const [messagingInterfaceHeight, setMessagingInterfaceHeight] = useState(60);

  useEffect(() => {
    props.selectedContact && fetch(`/api/settings?user=${(jwt_decode(Cookies.get('JSON_WEB_TOKEN') as string) as JwtPayload).user}`, {
      method: 'GET'
    }).then((response)=>{
       response.json().then(({avatar_url})=>{
          setLocalAvatarURL(avatar_url);
      });
    });
  }, [])

  useEffect(()=>{
    window.clearInterval(myInterval);

    // only fetches on 200 OK
    props.selectedContact && fetch(`/api/messages?contact=${props.selectedContact.email}`, {
      method: 'GET'
    }).then((response)=>{
       response.json().then((data)=>{
          setChatHistory(data);
          previousData = data;
      });
    });
    
    props.selectedContact && fetch(`/api/settings?user=${props.selectedContact.email}`, {
      method: 'GET'
    }).then((response)=>{
       response.json().then(({avatar_url})=>{
          setContactAvatarURL(avatar_url);
      });
    });

    myInterval = setInterval(() => {
      props.selectedContact && fetch(`/api/messages?contact=${props.selectedContact.email}`, {
        method: 'GET'
      }).then((response)=>{
         response.json().then((data)=>{
            if(previousData.length !== data.length){
              setChatHistory(data);
              previousData = data;
            }
        });
      });
    }, 1000);
    
  },[props.selectedContact])

  return (
    <div css={chatStyles}>
      <ChatHistory selectedContact={props.selectedContact} chatHistory={chatHistory} localAvatarURL={localAvatarURL} contactAvatarURL={contactAvatarURL} messagingInterfaceHeight={messagingInterfaceHeight}/>
      <MessagingInterface selectedContact={props.selectedContact} setMessagingInterfaceHeight={setMessagingInterfaceHeight}/>
    </div>
  );
}
