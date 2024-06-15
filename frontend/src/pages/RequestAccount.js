import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleEmailBlur = (event) => {
        setEmail(event.target.value);
        validateEmail();
    };

    function validateEmail() {
        if (email.trim() === "") {
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        var validForm = validateEmail();

        if (validForm) {
            try {
                // TODO POST
                console.log({
                    email: data.get("email")
                });
                // TODO if succeeds direct to a different page
                navigate('/check-email');
            } catch (error) {
                // TODO display error message
                console.log(error);
            }
        }
    }

    const handleLoginClick = () => {
        navigate('/login');
      };

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
                                    name="uvic email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    onBlur={handleEmailBlur}
                                    error={emailError}
                                    helperText={
                                        emailError ? "Email is required" : ""
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
                                Request Account
                              </Button>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body1" align="center" sx={{ mt: 1 }}>
                                  Already have an account?
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Button onClick={handleLoginClick}
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  sx={{ mt: 3, mb: 2 }}
                              >
                                  Go to login page
                              </Button>
                            </Grid>
                            
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default Login;

