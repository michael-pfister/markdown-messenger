import { css } from "@emotion/react";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import Cookies from "js-cookie";
import { Alert, AlertTitle } from "@mui/material";
import { style } from "@mui/system";
import { isContext } from "vm";

const styles = {
    root: css`
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
    `,
    loadingMessage: css`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        h2{
            width: 100%;
            padding: 0 10px;
            font-weight: lighter;
            text-align: center;
        }
    `
}

const Verification = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [loading, setLoading] = useState(true);
    const [statusCode, setStatusCode] = useState(0);
    const [responseBody, setResponseBody] = useState('Oops! Something went wrong.'); 

    useEffect(()=>{
        fetch('/api/users/verification', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
              JWT: Cookies.get('JSON_WEB_TOKEN'), 
              verificationCode: props.verificationCode
            })}).then((response)=>{
                response.json().then((data)=>{
                    setResponseBody(data);
                });
                setStatusCode(response.status);
                setLoading(false);
            });
    }, []);

    if (loading){
        return <div css={styles.root}>
            <div css={styles.loadingMessage}>
                <CircularProgress />
                <h2>Setting Up Your Account</h2>
            </div>
        </div>;
    }else{
        if(statusCode === 200){ 
            Cookies.set('JSON_WEB_TOKEN', responseBody);
            return <div css={styles.root}>
                <Alert variant={'outlined'} severity="success">
                    <AlertTitle>Success</AlertTitle>
                    Yay 🎉! You are now signed in.
                </Alert>
            </div>;
        }else{
            return <div css={styles.root}>
                <Alert variant={'outlined'} severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {responseBody}
                </Alert>
            </div>;
        }
    }
}

const getServerSideProps = async (context: GetServerSidePropsContext) => {
    return {
      props: {verificationCode: context.query.code ? context.query.code : null},
    }
}

export default Verification;
export { getServerSideProps };