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

const categories = [
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Office Supplies', label: 'Office Supplies' },
    { value: 'Electronics', label: 'Electronics' },
    {value:'Vehicles', label:'Vehicles'},
    {value:'Phones',label:'Phones'},
    {value:'Entertainment', label: 'Entertainment'},
    {value:'Garden', label:'Garden'},
    {value:'Outdoor',label:'Outdoor'},
    {value:'Sports',label:'Sports'},
    {value:'Kicthen Supplies',label:'Kitchen Supplies'},
    {value:'Musical Instruments',value:'Musical Instruments'},
    {value:'Apparel',label:'Apparel'},
    {value: 'Beauty',label:'Beauty'},
    {value:'Health',label:'Health'}
  ];
const statuses = [
    { value: 'AVAILABLE', label: 'AVAILABLE' },
    { value: 'SOLD', label: 'SOLD' }
  ];

export default function ManageListing({ listing }) {

    let navigate = useNavigate();

    const currTitle = listing.title;
    const currPrice = listing.price;
    const currPostalCode = listing.location;
    const currCategory = listing.category;
    const currStatus = listing.status;


    const [title, setTitle] = useState(currTitle);
    const [titleError, setTitleError] = useState(false);
    const [price, setPrice] = useState(currPrice);
    const [priceError, setPriceError] = useState(false);
    const [postalCode, setPostalCode] = useState(currPostalCode);
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [category, setCategory] = useState(currCategory);
    const [status, setStatus] = useState(currStatus);
    const [buyer, setBuyer] = useState("");
    const [buyerError, setBuyerError] = useState(false);

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

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        var validForm = validateTitle() && validatePrice() && validatePostalCode() && validateCategory() && validateBuyer();

        if (validForm) {
            try {
                // TODO POST (edit)
                console.log({
                    title: data.get("title"),
                    price: data.get("price"),
                    postalCode: data.get("postalCode"),
                    category: category,
                    status: status,
                    buyer: data.get("buyer")
                });
                navigate(`/manage-listings`);
            } catch (error) {
                // TODO display error message
                console.log(error);
            }
        }      
    }

    const handleDelete = (event) => {
        // TODO POST (delete)
        console.log("DELETE!");
        navigate("/manage-listings");
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