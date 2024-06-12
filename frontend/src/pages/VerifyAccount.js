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
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [postalCode, setPostalCode] = useState("");
    const [postalCodeError, setPostalCodeError] = useState(false);
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        // TODO how to display an error if page returns due to duplicate username?
        setUsernameError(false);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.validity.patternMismatch) {
            setPasswordError(true);
        } else if (password.includes(' ')) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    };

    const handlePostalCodeChange = (event) => {
        setPostalCode(event.target.value);
        if (event.target.validity.patternMismatch) {
            setPostalCodeError(true);
        } else {
            setPostalCodeError(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // TODO POST 
        console.log({
            username: data.get('username'),
            password: data.get('password'),
            postalCode: data.get('postalCode'),
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
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                        helperText={
                            passwordError ? "Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter" : ""
                        }
                        inputProps={{
                            pattern: "(?=.*[0-9])(?=.*[!@#$^&*?<>])(?=.*[a-z])(?=.*[A-Z])(?! ).{8,}",
                        }}
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
                        name="postalCode"
                        label="Postal Code"
                        type="postalCode"
                        id="postalCode"
                        value={postalCode}
                        onChange={handlePostalCodeChange}
                        error={postalCodeError}
                        helperText={
                            postalCodeError ? "Please enter a valid postal code (format: A1A 1A1)" : ""
                        }
                        inputProps={{
                            pattern: "^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] [0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$",
                        }}
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