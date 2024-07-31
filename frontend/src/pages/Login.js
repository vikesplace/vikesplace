import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { Store } from 'react-notifications-component';

function Login() {
    const authService = new AuthService();
    
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const navigate = useNavigate();

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

    function validateUsername() {
        if (username.trim() === "") {
            setUsernameError(true);
            return false;
        } else {
            setUsernameError(false);
            return true;
        }
    }

    function validatePassword() {
        if (password.trim() === "") {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
            return true;
        }
    }

    async function handleSubmit (event) {
        event.preventDefault();
        var validForm = validateUsername() && validatePassword();

        if (validForm) {
            let response = await authService.login(username, password);
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
            } else if (response.status === 200) {
                navigate('/home');
            } else if (response.status === 400) {
                Store.addNotification({
                    title: 'Unable to Login',
                    message: 'Username or password is incorrect',
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
            } else {
                Store.addNotification({
                    title: 'Unable to Login',
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
        <div className="Login">
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
                        Welcome to VikesPlace!
                    </Typography>
                    <Box component="form" data-testid="form"noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    onBlur={handleUsernameBlur}
                                    error={usernameError}
                                    helperText={
                                        usernameError ? "Username is required" : ""
                                    }
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
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onBlur={handlePasswordBlur}
                                    error={passwordError}
                                    helperText={
                                        passwordError ? "Password is required" : ""
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                             >
                                Login
                              </Button>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Link href="/request-account" variant="body1" sx={{ mt: 1 }}>
                                    Need an account?
                                </Link>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Link href="/password-change" variant="body1" sx={{ mt: 1 }}>
                                    Forgot your password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Login;
