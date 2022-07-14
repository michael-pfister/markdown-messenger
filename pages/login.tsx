import { css } from '@emotion/react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle, Grid } from '@mui/material';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { stringify } from 'querystring';
import { useState } from 'react';
import { Interface } from 'readline';
import AuthenticationForm from '../components/AuthenticationForm';

const styles = {
  links: css`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;

    a {
      color: darkblue;
    }
  `,
};

export interface fromTarget {
  [key: string]: any;
}

const SignIn = () => {
  const [alert, setAlert] = useState({} as {[key: string]: any;});

  return (
    <AuthenticationForm 
      heading="Sign In" 
      onSubmit={(event)=>{
        event.preventDefault();
        fetch('/api/users/login', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: (event.target as fromTarget)[0].value, 
            password: (event.target as fromTarget)[2].value
          })})
          .then((response)=>{
            if (response.status === 200){
              response.json().then((data)=>{
                Cookies.set( 'JSON_WEB_TOKEN', data);
                setAlert({message: '🎉 You are signed in!', severity: 'success'});
              });
            }else{
              response.json().then((data)=>{
                setAlert({message: data, severity: 'error'});
              });
            }
            });
    }}>
      <Grid container spacing={2} justifyContent={'center'}>
        {Object.keys(alert).length ? <Grid item xs={12}>
          <Alert variant={'outlined'} severity={alert.severity}>
                    <AlertTitle>{alert.severity}</AlertTitle>
                    {alert.message}
                </Alert>
          </Grid> : null}
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="email"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            type="password"
            name="password"
            label="Password"
            fullWidth
            autoComplete="password"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div css={styles.links}>
            <Link href="/signup">Dont have an Account? Sign Up</Link>
          </div>
        </Grid>
      </Grid>
    </AuthenticationForm>
  );
};

export default SignIn;
