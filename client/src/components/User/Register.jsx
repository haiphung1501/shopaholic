import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {Alert} from '@mui/material'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useForm} from "react-hook-form";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {

  const {register, handleSubmit, watch, formState: {errors}} = useForm();
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"  
                  autoComplete="email"
                  {...register('email', {
                    required:true,
                    pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: true,
                    minLength: 6
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  {...register('confirmPassword', {
                    required:true, 
                    minLength: 6,
                    validate: () => {
                        if (watch('password') != watch('confirmPassword')) {
                            return "Your password doesn't not match";
                        }
                    }
                  })}
                />
              </Grid>
              {Object.keys(errors).length !== 0 && (
                <Grid item xs = {12}>
                    {errors.email?.type === 'required' && 
                    <Alert sx ={{my: 0.5}} severity="error">
                        Email is required
                    </Alert>}
                    {errors.password?.type === 'required' && 
                    <Alert sx ={{my: 0.5}} severity="error">
                        Password is required
                    </Alert>}
                    {errors.password?.type === 'minLength' && 
                    <Alert sx ={{my: 0.5}}severity="error">
                        Password must have at least 6 characters
                    </Alert>}
                    {errors.confirmPassword?.type === 'required' && 
                    <Alert sx ={{my: 0.5}} severity="error">
                        Confirm password is required
                    </Alert>}
                    {errors.confirmPassword?.type === 'validate' && 
                    <Alert sx ={{my: 0.5}} severity="error">
                        Password doesn't match
                    </Alert>}
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}