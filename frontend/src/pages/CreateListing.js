import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DataService from '../services/DataService';

const categories = [
  { value: 'Furniture', label: 'Furniture' },
  { value: 'SchoolSupplies', label: 'School Supplies' },
  { value: 'Technology', label: 'Technology' }
];

function CreateListing() {
    const dataService = new DataService();

    let navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [price, setPrice] = useState("");
    const [priceError, setPriceError] = useState(false);
    const [postalCode, setPostalCode] = useState("");
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [category, setCategory] = useState("");

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

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
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
        var format = new RegExp("^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$");
        if (!format.test(postalCode)) {
            setPostalCodeError(true);
            return false;
        } else {
            setPostalCodeError(false);
            return true;
        }
    }

    function validateCategory() {
        if (category === null || category === "") {
          return false;
        } else {
            return true;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);

        var validForm = validateTitle() && validatePrice() && validatePostalCode() && validateCategory();

        if (validForm) {
            let response = dataService.createListing(title, price, postalCode, "AVAILABLE", category); 
            if (response !== undefined) {
                navigate(`/manage-listings`);
            }
        }
    }

  return (
    <div className="CreateListing">
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
                Create a Listing
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
                            postalCodeError ? "Please enter a valid postal code (format: A1A 1A1)" : ""
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      required
                      label="Category"
                      labelId="category-label"
                      id="category"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Create
                </Button>
                </Grid>
            </Box>
        </Box>
      </Container>
    </div>
  );
}

export default CreateListing;