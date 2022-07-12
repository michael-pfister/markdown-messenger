import { css } from "@emotion/react";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { InferGetServerSidePropsType } from 'next';

const styles = {
    root: css`
        height: 100vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;

        div{
            width: 100%;
            display: flex;
            justify-content: center;
        }

        p{
            margin: 30px;
            text-align: center;
            font-size: x-large;
        }
    `
}

const Message = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return <div css={styles.root}>
            <div>
                <Image width={150} height={150} src="/images/email-mail-sent.svg" alt="Email Icon"/>
            </div>
            <p>
                An email with a verification link was sent to <strong>{props.email}</strong>.
                <br />
                <br />
                Please open that link <strong>in this browser</strong> to verify your email address.
            </p>
        </div>;
}

const getServerSideProps = async (context: GetServerSidePropsContext) => {
    return {
      props: {email: context.query.email},
    }
  }

export default Message;
export { getServerSideProps };