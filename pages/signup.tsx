import { css } from '@emotion/css';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import Link from 'next/link';
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
  return (
    <AuthenticationForm
      heading="Sign Up"
      onSubmit={(event) => {
        event.preventDefault();
        const formValues = new Array();
        Object.keys(event.target).map((key) => {
          !(Number(key) % 2) &&
            Number(key) < 6 &&
            formValues.push((event.target as fromTarget)[key].value);
        });
        formValues.push((event.target as fromTarget)[6].checked);

        console.log(formValues);
      }}
    >
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            name="user name"
            label="User Name"
            fullWidth
            autoComplete="username"
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
          <Link href="/signin" css={styles.link}>
            Already have an account? Sign In
          </Link>
        </Grid>
      </Grid>
    </AuthenticationForm>
  );
};

export default SignUp;
