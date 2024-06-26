import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import AuthService from '../services/AuthService';


function VerifyAccount() {
    const location = useLocation();
    const jwt = location.search.replace("?jwt=", "");
    const authService = new AuthService();
    
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPass, setConfirmPass] = useState("");
    const [confirmPassError, setConfirmPassError] = useState(false);
    const [postalCode, setPostalCode] = useState("");
    const [postalCodeError, setPostalCodeError] = useState(false);
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleUsernameBlur = (event) => {
        setUsername(event.target.value);
        validateUsername();
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordBlur = (event) => {
        setPassword(event.target.value);
        validatePassword();
    };

    const handleConfirmPassChange = (event) => {
        setConfirmPass(event.target.value);
    };

    const handleConfirmPassBlur = (event) => {
        setConfirmPass(event.target.value);
        validateConfirmPassword();
    };

    const handlePostalCodeChange = (event) => {
        setPostalCode(event.target.value);
    };

    const handlePostalCodeBlur = (event) => {
        setPostalCode(event.target.value);
        validatePostalCode();
    };

    function validateUsername() {
        var format = new RegExp("^[A-Za-z0-9_@]{6,20}$");
        if (username.trim() === "") {
            setUsernameError("Username is required");
            return false;
        } else if (!format.test(username)) {
            setUsernameError("Must be 6-20 characters (allow: letters, numbers, _, @)");
            return false;
        } else if (usernameError === "This username has already been chosen") {
            return false;
        } else {
            setUsernameError("");
            return true;
        }
    }

    function validatePassword() {
        var format = new RegExp("^(?=.*[0-9])(?=.*[!@#$^&*?<>])(?=.*[a-z])(?=.*[A-Z])(?! ).{8,}$");
        if (!format.test(password)) {
            setPasswordError(true);
            return false;
        } else if (password.includes(' ')) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
            return true;
        }
    }

    function validateConfirmPassword() {
        if (confirmPass !== password) {
            setConfirmPassError(true);
            return false;
        } else {
            setConfirmPassError(false);
            return true;
        }
    }

    function validatePostalCode() {
        var format = new RegExp("^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$");
        if (!format.test(postalCode)) {
            setPostalCodeError(true);
            return false;
        } else {
            setPostalCodeError(false);
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        
        var validForm = validateUsername() && validatePassword() && validateConfirmPassword() && validatePostalCode();
        if (validForm) {
            let response = authService.verify(jwt, username, password, postalCode);
            if (response !== undefined) {
                let message = response.data.message;
                if (message !== undefined) {
                    // TODO, use exact error messages
                    if (message.includes("username")) {
                        setUsernameError("Username is already taken, please choose another");
                    }
                }
            }
            
        }
    }
    
  return (
    <div className="VerifyAccount">
      <Container>
      <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
                        onBlur={handleUsernameBlur}
                        error={usernameError !== ""}
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
                        onBlur={handlePasswordBlur}
                        error={passwordError}
                        helperText={
                            passwordError ? "Must be 8+ characters, with at least 1 symbol, number, lowercase letter, and uppercase letter" : ""
                        }
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
                        value={confirmPass}
                        onChange={handleConfirmPassChange}
                        onBlur={handleConfirmPassBlur}
                        error={confirmPassError}
                        helperText={
                            confirmPassError ? "Must match password" : ""
                        }
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
                        onBlur={handlePostalCodeBlur}
                        error={postalCodeError}
                        helperText={
                            postalCodeError ? "Please enter a valid postal code (format: A1A 1A1)" : ""
                        }
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