import { css } from '@emotion/css';
import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useState } from 'react';
import AuthenticationForm from '../components/AuthenticationForm';

const styles = {
  link: css`
    width: 100%;
    text-align: right;
    color: darkblue;
  `,
};

interface fromTarget {
  [key: string]: any;
}

const SignUp = () => {
  const router = useRouter();
  const [alert, setAlert] = useState({} as {[key: string]: any;});

  return (
    <AuthenticationForm
      heading="Sign Up"
      onSubmit={(event)=>{
        event.preventDefault();
        fetch('/api/users/register', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({
            userName: (event.target as fromTarget)[0].value, 
            email: (event.target as fromTarget)[2].value, 
            password: (event.target as fromTarget)[4].value})})
          .then((response)=>{
            if (response.status === 308){
              response.json().then((data)=>{
                Cookies.set( 'JSON_WEB_TOKEN', data.JWT);
                setAlert({message: '👌 You will be redirected.', severity: 'success'});
                router.push(data.redirect);
              });
            }else{
              response.json().then((data)=>{
                setAlert({message: data, severity: 'error'});
              });
            }
            }
          );
      }}
    >
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
            name="user_name"
            label="User Name"
            fullWidth
            autoComplete="name"
            required
          />
        </Grid>
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
            autoComplete="new-password"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="newsletter" color="primary" />}
            label="I want to receive notifications via email"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Link href="/login" css={styles.link}>
            Already have an account? Sign In
          </Link>
        </Grid>
      </Grid>
    </AuthenticationForm>
  );
};

export default SignUp;
