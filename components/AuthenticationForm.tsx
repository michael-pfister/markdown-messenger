import { css } from '@emotion/react';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LockIcon from '@mui/icons-material/Lock';
import { FormEventHandler } from 'react';

const styles = {
  root: css`
    height: 100vh;
  `,

  image: css`
    background-image: url('https://source.unsplash.com/random');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `,

  signup: css`
    box-shadow: -5px 0px 100px black;
    padding: 50px;
    display: flex;
    align-items: center;
  `,

  form: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    & > * {
      margin: 20px 0px;
    }
  `,

  icon: css`
    padding: 100%;
    background-color: tomato;
  `,

  heading: css`
    width: 100%;
    text-align: center;
    font-weight: lighter;
    margin: 0 0 50px 0;
  `,
};

type Props = {
  heading: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children?: JSX.Element | JSX.Element[];
};

const AuthenticationForm = ({ heading, onSubmit, children }: Props) => {
  return (
    <Grid container css={styles.root}>
      <Grid item xs={false} sm={4} md={7} css={styles.image} />
      <Grid item xs={12} sm={8} md={5} css={styles.signup}>
        <form css={styles.form} onSubmit={onSubmit}>
          <Avatar>
            <LockIcon css={styles.icon} />
          </Avatar>
          <h1 css={styles.heading}>{heading}</h1>
          {children}
        </form>
      </Grid>
    </Grid>
  );
};

export default AuthenticationForm;
