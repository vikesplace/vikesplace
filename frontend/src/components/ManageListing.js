import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DataService from '../services/DataService.js';
import { Store } from 'react-notifications-component';

const statuses = [
    { value: 'AVAILABLE', label: 'AVAILABLE' },
    { value: 'REMOVED', label: 'REMOVED' },
    { value: 'SOLD', label: 'SOLD' }
];

export default function ManageListing({ listing }) {
    const dataService = new DataService();

    let navigate = useNavigate();

    const currTitle = listing.title;
    const currPrice = listing.price;
    const currPostalCode = listing.location;
    const currStatus = listing.status;
    const currCharity = listing.forCharity;

    const [title, setTitle] = useState(currTitle);
    const [titleError, setTitleError] = useState(false);
    const [price, setPrice] = useState(currPrice);
    const [priceError, setPriceError] = useState(false);
    const [postalCode, setPostalCode] = useState(currPostalCode);
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [status, setStatus] = useState(currStatus);
    const [buyer, setBuyer] = useState("");
    const [buyerError, setBuyerError] = useState(false);
    const [forCharity, setForCharity] = useState(currCharity);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTitleBlur = (event) => {
      setTitle(event.target.value);
      validateTitle();
  };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handlePriceBlur = (event) => {
        setPrice(event.target.value);
        validatePrice();
    };

    const handlePostalCodeChange = (event) => {
        setPostalCode(event.target.value);
    };

    const handlePostalCodeBlur = (event) => {
        setPostalCode(event.target.value);
        validatePostalCode();
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        if (status !== 'SOLD' && buyer) {
            setBuyer("");
        }
    };

    const handleBuyerChange = (event) => {
        setBuyer(event.target.value);
    };

    const handleBuyerBlur = (event) => {
        setBuyer(event.target.value);
        validateBuyer();
    };

    const handleForCharityChange = (event) => {
        setForCharity(!forCharity);
    };

    function validateTitle() {
      if (title.trim() === "") {
          setTitleError(true);
          return false;
      } else {
          setTitleError(false);
          return true;
      }
  }

    function validatePrice() {
        var format = new RegExp("^([0-9]*[.]{0,1}[0-9]{0,2})$");
        if (!format.test(price)) {
            setPriceError(true);
            return false;
        } else if (price === "") {
            setPriceError(true);
            return false;
        } else {
            setPriceError(false);
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

    function validateBuyer() {
        if (status !== 'SOLD' || buyer) {
            if (buyer.includes(' ')) {
                setBuyerError(true);
                return false;
            }
            return true;
        } else {
            setBuyerError(true);
            return false;
        }
    }

    function validateStatus() {
        if (currStatus === "REMOVED") {
            Store.addNotification({
                title: 'Status Error',
                message: 'Cannot modify a deleted listing',
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
            return false;
        } else if (status === "REMOVED") {
            Store.addNotification({
                title: 'Status Error',
                message: 'Please use Delete button to remove listing',
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
            return false;
        }
        return true;
    }

    async function handleSubmit (event) {
        event.preventDefault();
        var validForm = validateTitle() && validatePrice() && validatePostalCode() && validateBuyer() && validateStatus();

        if (validForm) {
            const upperPostal = postalCode.toUpperCase();

            const newTitle = title === listing.title ? undefined : title;
            const newPrice = price === listing.price ? undefined : price;
            const newPostal = upperPostal === listing.location ? undefined : upperPostal;
            const newStatus = status === listing.status ? undefined : status;
            const newBuyer = buyer === "" ? undefined : buyer;
            const newCharity = forCharity === listing.forCharity ? undefined : forCharity;
            
            let response = await dataService.updateListing(listing.listingId, newTitle, newPrice, newPostal, newStatus, newBuyer, newCharity);
            
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
                navigate(`/manage-listings`);
            } else {
                Store.addNotification({
                    title: 'Unable to Edit Listing',
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

    async function handleDelete (event) {
        event.preventDefault();
        let response = await dataService.deleteListing(listing.listingId);
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
            navigate(`/manage-listings`);
        } else {
            Store.addNotification({
                title: 'Unable to Delete Listing',
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

  return (
    <div className="ManageListing">
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
                Edit Listing
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        error={titleError}
                        helperText={
                            titleError ? "Title is required" : ""
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="price"
                        label="Price"
                        id="price"
                        value={price}
                        onChange={handlePriceChange}
                        onBlur={handlePriceBlur}
                        error={priceError}
                        helperText={
                            priceError ? "Expected format: $#.##" : ""
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
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      required
                      label="Status"
                      labelId="status-label"
                      id="status"
                      value={status}
                      onChange={handleStatusChange}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {status === 'SOLD' && 
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="buyer"
                        label="Buyer's Username"
                        name="buyer"
                        value={buyer}
                        onChange={handleBuyerChange}
                        onBlur={handleBuyerBlur}
                        error={buyerError}
                        helperText={
                            buyerError ? "Buyer username is required" : ""
                        }
                    />
                </Grid>}
                <Grid item xs={12}>
                    <FormControlLabel 
                      required 
                      control={<Checkbox checked={forCharity}/>} 
                      label="Donate the funds from this listing to charity?" 
                      value={forCharity}
                      onChange={handleForCharityChange}
                    />
                </Grid>
                <Button
                    type="submit"
                    name="submit"
                    value="Submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Save
                </Button>
                <Button
                    name="delete"
                    value="Delete"
                    onClick={handleDelete}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="error"
                >
                Delete
                </Button>
                </Grid>
            </Box>
        </Box>
      </Container>
    </div>
  );
}