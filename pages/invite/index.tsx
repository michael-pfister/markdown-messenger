import { css } from "@emotion/react";
import { Button, Grid, Input } from "@material-ui/core";
import { Alert, AlertTitle, InputAdornment } from "@mui/material";
import { useState } from "react";
import { fromTarget } from "../login";
import copy from 'copy-to-clipboard';
import { AccountCircle } from "@mui/icons-material";

const styles = {
    root: css`
        height: 100vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
    `,

    heading: css`
        width: 100vw;
        text-align: center;
        font-weight: lighter;
    `,

    link: css`
        width: 100%;
        margin-top: 3em;
        text-align: center;
    `
}

const Invite = () => {
    const [alert, setAlert] = useState({} as {[key: string]: any;});
    const [link, setLink] = useState('');

    return <div css={styles.root}>
        <h1 css={styles.heading}>Invite a user</h1>
        <form onSubmit={(event)=>{
            event.preventDefault();

            fetch(`/api/invite?user=${(event.target as fromTarget)[0].value}`)
            .then((response)=>{
                if (response.status !== 200){
                    response.json().then((data)=>{
                        setAlert({message: data, severity: 'error'});
                    });
                }else{
                    Object.keys(alert).length && setAlert({});
                    response.json().then((data)=>{
                        setLink(data);
                    });
                }
            });
        }}>
            <Input placeholder="Email" aria-label="Email of whoever you'd like to invite" startAdornment={
                <InputAdornment position="start">
                <AccountCircle />
                </InputAdornment>
            } required/>
            <Button type="submit">generate link</Button>

            {Object.keys(alert).length ? <Grid item xs={12}>
                <Alert variant={'outlined'} severity={alert.severity}>
                            <AlertTitle>{alert.severity}</AlertTitle>
                            {alert.message}
                        </Alert>
                </Grid> : null}
        </form>

        {link ?
            <div css={styles.link}>
                <a href={`${window.location.href}/accept${link}`}>🔗 Your Invitation Link</a>
                <Button onClick={()=>{
                    copy(`${window.location.href}/accept${link}`);
                }}>copy</Button>
            </div> 
        : null}
    </div>;
}

export default Invite;