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
import { statuses } from '../utils/ListingData.js';

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
        var format = new RegExp("^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$");
        if (!format.test(postalCode)) {
            setPostalCodeError(true);
            return false;
        } else {
            setPostalCodeError(false);
            return true;
        }
    }

    function validateBuyer() {
        if ( status !== 'SOLD'|| buyer) {
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

    async function handleSubmit (event) {
        event.preventDefault();
        var validForm = validateTitle() && validatePrice() && validatePostalCode() && validateBuyer();

        if (validForm) {
            let response = await dataService.updateListing(listing.listingId, title, price, postalCode, status, buyer, forCharity);
            if (response === undefined) {
                alert("Connection error. Please try again.");
            } else if (response.status === 200) {
                navigate(`/manage-listings`);
            } else {
                alert("Unable to edit listing, please try again.");
            }
        }      
    }

    async function handleDelete (event) {
        event.preventDefault();
        let response = await dataService.deleteListing(listing.listingId);
        if (response === undefined) {
            alert("Connection error. Please try again.");
        } else if (response.status === 200) {
            navigate(`/manage-listings`);
        } else {
            alert("Unable to delete listing, please try again.");
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