import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


function VerifyAccount() {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    // TODO validate password/confirm password
    // TODO validate address (is a real place?)
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        // TODO criteria for valid username?
        // possible to return to this page after form submits and display errors?
        if (event.target.value.length > 20) {
            setUsernameError("Username is too long");
        } else {
            setUsernameError(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // TODO POST 
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
    }
    
  return (
    <div className="VerifyAccount">
      <Container>
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography component="h1" variant="h5">
                Finish Creating Account
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={handleUsernameChange}
                        error={usernameError}
                        helperText={usernameError}
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
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="confirm-password"
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="address"
                        label="Address"
                        type="address"
                        id="address"
                        autoComplete="street-address"
                    />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Sign Up
                </Button>
                </Grid>
            </Box>
        </Box>
      </Container>
    </div>
  );
}

export default VerifyAccount;