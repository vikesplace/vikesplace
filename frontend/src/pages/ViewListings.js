import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../App.css';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';
import { Typography } from '@mui/material';
import DataService from '../services/DataService';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import IconButton from '@mui/material/IconButton';

function ViewListings() {
  const dataService = useMemo(() => new DataService(), []);
  const navigate = useNavigate();

  const [sortCategory, setSortCategory] = useState("listed_at");
  const [sortOrder, setSortOrder] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [statusFilter, setStatusFilter] = useState('');
  const [location, setLocation] = useState('Fetching...');
  const [listings, setListings] = useState([]);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [postalCodeError, setPostalCodeError] = useState(false);


  useEffect(() => {
    const fetchListings = async () => {
      const response = await dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, sortOrder); 
      if (response === undefined) {
        alert("Connection error, please try again.");
      } else if (response.status === 200) {
        setListings(response.data);
      } else {
        alert("Unable to get listings, please try again.");
      }
    };

    const fetchLocation = async () => {
      const response = await dataService.getMyUserData();
      setLocation(response !== undefined ? response.data.location : "V8V2G4");
    };

    fetchListings();
    fetchLocation();
  }, [dataService, priceRange, statusFilter, sortCategory, sortOrder]);

  const handleListingClick = (id) => {
    navigate(`/listings/${id}`);
  };

  const handleSortChange = async (event) => {
    const category = event.target.value;
    setSortCategory(category);

    const response = await dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, sortOrder); 
    if (response === undefined) {
      alert("Connection error, please try again.");
    } else if (response.status === 200) {
      setListings(response.data);
    } else {
      alert("Unable to get listings, please try again.");
    }
  };

  const handleSortOrderClick = async () => {
    const currOrder = sortOrder;
    setSortOrder(!currOrder);

    const response = await dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, sortOrder); 
    if (response === undefined) {
      alert("Connection error, please try again.");
    } else if (response.status === 200) {
      setListings(response.data);
    } else {
      alert("Unable to get listings, please try again.");
    }
  };

  const handlePriceRangeChange = (event) => {
    const { name, value } = event.target;
    setPriceRange(prevRange => ({ ...prevRange, [name]: value }));
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const applyFilters = async () => {
    const response = await dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, sortOrder); 
    if (response === undefined) {
      alert("Connection error, please try again.");
    } else if (response.status === 200) {
      setListings(response.data);
    } else {
      alert("Unable to get listings, please try again.");
    }
    setOpenFilterDialog(false);
  };

  const handleClickOpenFilterDialog = () => {
    setOpenFilterDialog(true);
  };

  const handleCloseFilterDialog = () => {
    setOpenFilterDialog(false);
  };

  const handleClickOpenLocationDialog = () => {
    setOpenLocationDialog(true);
  };

  const handleCloseLocationDialog = () => {
    setOpenLocationDialog(false);
  };

  const validatePostalCode = (code) => {
    var format = new RegExp("^[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]$");
    if (!format.test(code)) {
        setPostalCodeError(true);
        return false;
    } else {
        setPostalCodeError(false);
        return true;
    }
  };

  const applyNewLocation = () => {
    if (validatePostalCode(newLocation)) {
      setLocation(newLocation);
      // update listings based on new location 
      let response = dataService.updateUserData(newLocation);
      if (response !== undefined) {
        // check error messages
      }
      setOpenLocationDialog(false);
    }
  };

  return (
    <div className="ViewListings">
      <Container>
        <SearchBar />
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Box id="sort-options" display="flex"> 
            <FormControl sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortCategory}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="listed_at"><em>Time</em></MenuItem>
                <MenuItem value="price">Price</MenuItem>
                {/* <MenuItem value="location">Distance</MenuItem> */}
              </Select>
            </FormControl>
            <IconButton aria-label="change sorting order" onClick={handleSortOrderClick}>
              <SwapVertIcon />
            </IconButton>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FilterListIcon />}
            onClick={handleClickOpenFilterDialog}
          >
            Add Filter
          </Button>
        </Box>
        <Box mt={2} display="flex" alignItems="center">
          <LocationOnIcon />
          <Box ml={1} mr={2}>{location}</Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpenLocationDialog}
          >
            Change Location
          </Button>
        </Box>
        <Box mt={2}>
          {(listings === undefined || listings.length === 0) && 
            <Typography align="center" variant='h6'>
              No Listings Meet Criteria
            </Typography>
          }
          {listings !== undefined && listings.map((listing) => (
            <div key={listing.listingId} onClick={() => handleListingClick(listing.listingId)}>
              <ListingCard
                id={listing.listingId}
                title={listing.title}
                price={listing.price}
                location={listing.location}
                status={listing.status}
              />
              <br />
            </div>
          ))}
        </Box>
        <Dialog open={openFilterDialog} onClose={handleCloseFilterDialog}>
          <DialogTitle>Apply Filters</DialogTitle>
          <DialogContent>
            <TextField
              label="Min Price"
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceRangeChange}
              sx={{ mr: 2, mt: 2 }}
              fullWidth
            />
            <TextField
              label="Max Price"
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceRangeChange}
              sx={{ mt: 2 }}
              fullWidth
            />
            <FormControl sx={{ minWidth: 120, mt: 2, width: '100%' }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="SOLD">Sold</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFilterDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={applyFilters} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openLocationDialog} onClose={handleCloseLocationDialog}>
          <DialogTitle>Change Location</DialogTitle>
          <DialogContent>
            <TextField
              label="New Location"
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
              error={postalCodeError}
              helperText={postalCodeError ? "Invalid postal code format" : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLocationDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={applyNewLocation} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default ViewListings;
