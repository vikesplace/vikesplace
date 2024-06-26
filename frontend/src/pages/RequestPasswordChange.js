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

function RequestPasswordChange() {
    const authService = new AuthService();
    
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
        if (email.trim() === "Email is required") {
            setEmailError("");
            return false;
        } else if (!format.test(email)) {
            setEmailError("Must be a valid @uvic.ca emailEmail is required");
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
            let response = authService.requestPasswordChange(email);
            if (response !== undefined) {
                // TODO confirm success
                navigate('/check-email');
            }
            
        }
    }

    return (
        <div className="RequestPasswordChange">
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
                        Request Password Change
                    </Typography>
                    <Typography component="h6" variant="h6">
                        Enter the "@uvic.ca" email to assocaited with your account
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
                                Request Password Change
                              </Button>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Link href="/login" variant="body1" sx={{ mt: 1 }}>
                                    Prefer to login?
                                </Link>
                            </Grid>                            
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default RequestPasswordChange;