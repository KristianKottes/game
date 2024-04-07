import { Container, CssBaseline, Box, Typography, Grid, TextField, Button } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

import useUserNameForm from './useUserNameForm';

const SignUpForm = () => {
  const { formik } = useUserNameForm();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="username"
                required
                fullWidth
                label="Username"
                name="username"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/sign-in"> Already have an account? Sign in</NavLink>;
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
