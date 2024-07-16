import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import { Typography, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DataService from '../services/DataService';
import { SAMPLE_USER } from '../utils/SampleRecommenderData';
import AuthService from '../services/AuthService';

function UserProfile() {
  const dataService = new DataService();
  const authService = new AuthService();

  let initialUser = {};
  let response = dataService.getMyUserData();
  console.log(response);
  if (response !== undefined) {
    initialUser = response.data;
  } else {
    initialUser = SAMPLE_USER;
  }

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationChange = (event) => {
    setUser({ ...user, location: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authService.updateLocation(user.userId, user.location)
      .then(response => {
        if (response && response.data && response.data.message) {
          let message = response.data.message;
          setIsEditing(false);
          setError(null); // Clear any previous error
        } else {
          console.log('Unexpected response:', response);
          setError('Failed to update location. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error updating location:', error);
        setError('Failed to update location. Please try again.');
      });
  };

  return (
    <div className="UserProfile">
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          bgcolor="background.paper"
        >
          <Box
            border={1}
            borderRadius={5}
            borderColor="grey.300"
            p={4}
            width="30%"
            textAlign="left"
            boxShadow={3}
            mt={-20}
          >
            <Typography variant='h6'>Username:</Typography>
            <Typography variant='body2'>{user.username}</Typography>
            <br />
            <Typography variant='h6'>Email:</Typography>
            <Typography variant='body2'>{user.email}</Typography>
            <br />
            <Typography variant='h6'>Postal Code:</Typography>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  name="location"
                  value={user.location}
                  onChange={handleLocationChange}
                  fullWidth
                />
                <br />
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </Button>
              </form>
            ) : (
              <Box display="flex" alignItems="center">
                <Typography variant='body2'>{user.location}</Typography>
                <IconButton
                  color="primary"
                  onClick={() => setIsEditing(true)}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            )}
            <br />
            <Typography variant='h6'>Date Joined:</Typography>
            <Typography variant='body2'>{user.createDate}</Typography>
            <br />
            {/* Display error message if error state is not null */}
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default UserProfile;
