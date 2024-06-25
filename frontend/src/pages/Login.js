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

    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);

        var validForm = validateUsername() && validatePassword();

        if (validForm) {
            try {
                authService.login(username, password);
                navigate('/');
            } catch (error) {
                // TODO display error message
                console.log(error);
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
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

