import { css } from '@emotion/react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@mui/material';
import Link from 'next/link';
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

const SignIn = () => {
  return (
    <AuthenticationForm heading="Sign In">
      <Grid container spacing={2} justifyContent={'center'}>
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
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign In
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div css={styles.links}>
            <Link href="/">Forgot Password?</Link>
            <Link href="/signup">Dont have an Account? Sign Up</Link>
          </div>
        </Grid>
      </Grid>
    </AuthenticationForm>
  );
};

export default SignIn;
