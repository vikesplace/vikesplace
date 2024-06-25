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

function RequestAccount() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleEmailBlur = (event) => {
        setEmail(event.target.value);
        validateEmail();
    };

    function validateEmail() {
        var format = new RegExp("^[A-Z0-9a-z._%+-]+@uvic.ca$");
        if (!format.test(email)) {
            setEmailError("Must be a valid @uvic.ca email");
            return false;
        } else if (email.trim() === "") {
            setEmailError("Email is required");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);

        var validForm = validateEmail();

        if (validForm) {
            try {
                let authService = new AuthService();
                authService.register(email);
                navigate('/check-email');
            } catch (error) {
                // TODO display error message
                console.log(error);
            }
        }
    }

    return (
        <div className="RequestAccount">
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
                        Create an Account
                    </Typography>
                    <Typography component="h6" variant="h6">
                        Enter your "@uvic.ca" email to sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="email@uvic.ca"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={handleEmailBlur}
                                    error={emailError ? true : false}
                                    helperText={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                             >
                                Request Account
                              </Button>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Link href="/login" variant="body1" sx={{ mt: 1 }}>
                                    Have an account already? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default RequestAccount;

