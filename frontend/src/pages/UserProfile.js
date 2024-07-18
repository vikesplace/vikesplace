import React, { useState, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DataService from '../services/DataService';
import '../App.css';

function UserProfile() {
  const dataService = useMemo(() => new DataService(), []);
  const [user, setUser] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [postalCodeError, setPostalCodeError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await dataService.getMyUserData();
      if (response === undefined) {
        alert("Connection error, please try again.");
      } else if (response.status === 200) {
        setUser(response.data);
        setNewLocation(response.data.location);
      } else {
        alert("Unable to get listings, please try again.");
      }
    };

    fetchUser();
  }, [dataService]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const validatePostalCode = (postalCode) => {
    var format = new RegExp("^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][0-9]$");
    if (!format.test(postalCode)) {
      setPostalCodeError(true);
      return false;
    } else {
      setPostalCodeError(false);
      return true;
    }
  };

  const handleSaveClick = async () => {
    if (validatePostalCode(newLocation)) {
      let upperLocation = newLocation.toUpperCase();
      setNewLocation(upperLocation);
      const response = await dataService.updateUserData(upperLocation);
      if (response.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          location: upperLocation,
        }));
        setIsEditing(false);
      } else {
        alert("Unable to update location, please try again.");
      }
    } else {
      alert("Invalid postal code. Please enter a valid postal code.");
    }
  };

  if (user === undefined) {
    return (
      <div>
        <Typography align="center" variant='h6' sx={{ mt: 2 }}>
          No User Found
        </Typography>
      </div>
    );
  }

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
            <Typography variant='h6'>
              Username:
            </Typography>
            <Typography variant='body2'>
              {user.username}
            </Typography>
            <br />
            <Typography variant='h6'>
              Postal Code:
            </Typography>
            <Box display="flex" alignItems="center">
              {isEditing ? (
                <>
                  <TextField
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    variant="outlined"
                    size="small"
                    error={postalCodeError}
                    helperText={postalCodeError ? "Invalid postal code" : ""}
                  />
                  <Button onClick={handleSaveClick}>Save</Button>
                </>
              ) : (
                <>
                  <Typography variant='body2'>
                    {user.location}
                  </Typography>
                  <IconButton onClick={handleEditClick} size="small" sx={{ ml: 1 }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
            <br />
            <Typography variant='h6'>
              Date Joined:
            </Typography>
            <Typography variant='body2'>
              {new Date(user.joiningDate).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}
            </Typography>
            <br />
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default UserProfile;
