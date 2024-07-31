import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { Store } from 'react-notifications-component';

function VerifyAccount() {
    const navigate = useNavigate();
    const { jwt } = useParams();
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
        var format = new RegExp("^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][0-9]$");
        if (!format.test(postalCode)) {
            setPostalCodeError(true);
            return false;
        } else {
            setPostalCodeError(false);
            return true;
        }
    }

    async function handleSubmit (event) {
        event.preventDefault();        
        var validForm = validateUsername() && validatePassword() && validateConfirmPassword() && validatePostalCode();

        if (validForm) {
            const upperPostal = postalCode.toUpperCase();
            let response = await authService.verify(jwt, username, password, upperPostal);
            if (response === undefined) {
                Store.addNotification({
                    title: 'Connection Error!',
                    message: 'Please try again',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
            } else if (response.status === 200 || response.status === 201) {
                navigate('/verified');
            } else if (response.data?.message === "Username or email already exists") {
                Store.addNotification({
                    title: 'Issue Creating Account',
                    message: 'Username or email already exists',
                    type: 'warning',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
                setUsernameError("Username or email already exists, please choose another");
            } else {
                Store.addNotification({
                    title: 'Unable to Create Account',
                    message: 'Please try again',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
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
                        data-testid="password-input"
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
                        data-testid="confirm-password-input"
                        name="confirm-password"
                        label="Confirm Password"
                        type="confirm-password"
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
                            postalCodeError ? "Please enter a valid postal code with format A1A1A1" : ""
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