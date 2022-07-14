import { css } from "@emotion/react";
import { ContentCopy } from "@mui/icons-material";
import { Alert, AlertTitle } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

const styles = {
    root: css`
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    `
}

const Accept = (props: {
    user: string | null;
    verificationHash: string | null;
}) => {
    const [alert, setAlert] = useState({} as {[key: string]: any;});

    useEffect(()=>{
        fetch(`/api/invite?verificationHash=${props.verificationHash}&user=${props.user}`, { method: 'POST' })
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
    }, []);

    return <div css={styles.root}>
        {Object.keys(alert).length ?
            <Alert variant={'outlined'} severity={alert.severity}>
                <AlertTitle>{alert.severity}</AlertTitle>
                {alert.message}
            </Alert>: null}
    </div>;
}

const getServerSideProps = async (context: GetServerSidePropsContext) => {
    return {
      props: {
        user: context.query.user ? context.query.user : null,
        verificationHash: context.query.verificationHash ? context.query.verificationHash : null
        },
    }
}

export default Accept;
export {getServerSideProps};