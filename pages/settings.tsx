import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import Cookies from "js-cookie";
import { JwtPayload } from "./api/contacts";
import { Alert, AlertTitle, Avatar, Button, Card, Checkbox, Input, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { style } from "@mui/system";
import ContactListItem from "../components/messenger/header/ContactListItem";

type UserSettings = {
    avatar_url: string;
    email: string;
    name: string;
    status: boolean;
}

const styles = {
    root: css`
        height: 100vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
    `,

    heading: css`
        width: 100%;
        font-weight: lighter;
        text-align: center;
    `,

    preview: css`
        width: 100%;
        margin: 2em;
        display: flex;
        justify-content: center;
        gap: 1em;

        div{
            p{
                margin: 0;
            }
        }
    `,

    table: css`
        max-width: 400px;
    `,

    avatar: css`
        transform: scale(0.5);
    `,

    alertBox: css`
        width: 100%;
        margin: 2em;
        display: flex;
        justify-content: center;
    `,

    buttonContainer: css`
        width: 100%;
        margin: 2em;
        display: flex;
        justify-content: center;
    `
}

const Preview = ({userSettings}: {userSettings: UserSettings}) => {
    return <div css={styles.preview}>
        <Avatar src={userSettings.avatar_url}/>
        <div>
            <span>{userSettings.name}</span>
            <p className="MuiTypography-root MuiListItemText-secondary MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock">
                💬💬💬
            </p>
        </div>
    </div>
}

const Settings = () => {
    const [userSettings, setUserSettings] = useState({} as UserSettings);
    const [alert, setAlert] = useState({} as {[key: string]: any;});

    useEffect(() => {
        fetch(`/api/settings?user=${(jwt_decode(Cookies.get('JSON_WEB_TOKEN') as string) as JwtPayload).user}`, {
          method: 'GET'
        }).then((response)=>{
           response.json().then((data)=>{
              setUserSettings({
                avatar_url: data.avatar_url,
                email: data.email,
                name: data.name,
                status: data.status
              });
          });
        });
      }, [])

    return <form css={styles.root} onSubmit={(event)=>{
            event.preventDefault();
            fetch('/api/settings', {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(userSettings)})
                .then((response)=>{
                    if(response.status === 200){
                        response.json().then((data)=>{
                            setAlert({message: data, severity: 'success'});
                        });
                    }else{
                        response.json().then((data)=>{
                            setAlert({message: data, severity: 'error'});
                        });
                    }
                });
        }}>
        <h1 css={styles.heading}>User Settings</h1>

        {Object.keys(alert).length ?
            <div css={styles.alertBox}>
                <Alert variant={'outlined'} severity={alert.severity}>
                        <AlertTitle>{alert.severity}</AlertTitle>
                        {alert.message}
                </Alert>
            </div> : null}

        <Preview userSettings={userSettings} />

        <Table css={styles.table}>
            <TableBody>
                <TableRow>
                    <TableCell>
                        Profile Picture
                    </TableCell>
                    <TableCell>
                        <Input placeholder="Link" startAdornment={
                            <InputAdornment position="start">
                                <Avatar src={userSettings.avatar_url} css={styles.avatar}/>
                            </InputAdornment>
                        } onChange={({ target: {value}})=>{
                            setUserSettings({...userSettings, avatar_url: value});
                        }}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Email Address
                    </TableCell>
                    <TableCell>
                        {userSettings.email}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        Display Name
                    </TableCell>
                    <TableCell>
                        <Input placeholder={userSettings.name} onChange={({ target: {value}})=>{
                            setUserSettings({...userSettings, name: value});
                        }}/>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

        <div css={styles.buttonContainer}>
            <Button type="submit">save</Button>
        </div>
    </form>;
}

export default Settings;