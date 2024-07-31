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

function CompletePasswordChange() {
    const navigate = useNavigate();
    const { jwt } = useParams();

    const authService = new AuthService();
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordBlur = (event) => {
        setPassword(event.target.value);
        validatePassword();
    };

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

    async function handleSubmit (event) {
        event.preventDefault();
        var validForm = validatePassword();

        if (validForm) {
            let response = await authService.completePasswordChange(jwt, password);
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
                navigate('/password-updated');
            } else {
                Store.addNotification({
                    title: 'Unable to Request Change',
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
        <div className="CompletePasswordChange">
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
                        Change Password
                    </Typography>
                    <Box component="form" data-testid="password-form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
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
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                             >
                                Submit
                              </Button>
                            </Grid>                           
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default CompletePasswordChange;