import React, { useState, useEffect } from 'react';
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
import { SAMPLE_DATA } from '../utils/SampleRecommenderData';

const categories = [
  'Electronics', 'Phones', 'Vehicles', 'Entertainment', 'Garden', 'Outdoor', 'Sports', 'Kitchen Supplies', 'Furniture', 'Musical Instruments', 'Office Supplies', 'Apparel', 'Books', 'Beauty', 'Health'
];


function ViewListings() {
  const dataService = new DataService();
  const navigate = useNavigate();

  // TODO remove once api is working
  let initialListings = SAMPLE_DATA;

  const [sortCategory, setSortCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [location, setLocation] = useState('Fetching...');
  // TODO change intial state once api's working
  const [listings, setListings] = useState(initialListings);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [postalCodeError, setPostalCodeError] = useState(false);

  let response = dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, false); 
  if (response !== undefined) {
    setListings(response.data);
  }

  let currLocation = '';
  response = dataService.getMyUserData();
  if (response !== undefined) {
    currLocation = response.data;
  } else {
    // TODO remove once we expect api to succeed
    currLocation = "V8V2G4"
  }

  useEffect(() => {
    setTimeout(() => {
      setLocation(currLocation); 
      // update listings after location
    }, 1000);
  }, [currLocation]);

  const handleListingClick = (id) => {
    navigate(`/listings/${id}`);
  };

  const handleSortChange = (event) => {
    const category = event.target.value;
    setSortCategory(category);

    // TODO remove all until api call once working
    let sortedListings = [...listings];
    switch (category) {
      case 'price':
        sortedListings.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'location':
        sortedListings.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case 'status':
        sortedListings.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'category':
        sortedListings.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        sortedListings = initialListings;
        break;
    }
    setListings(sortedListings);

    response = dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, false); 
    if (response !== undefined) {
      setListings(response.data);
    } 
  };

  const handlePriceRangeChange = (event) => {
    const { name, value } = event.target;
    setPriceRange(prevRange => ({ ...prevRange, [name]: value }));
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const applyFilters = () => {
    // TODO remove all until api call once working
    const filteredListings = initialListings.filter(listing => {
      const inPriceRange = (priceRange.min === '' || parseFloat(listing.price) >= parseFloat(priceRange.min)) &&
                          (priceRange.max === '' || parseFloat(listing.price) <= parseFloat(priceRange.max));
      const matchesStatus = statusFilter === '' || listing.status === statusFilter;
      const matchesCategory = categoryFilter === '' || listing.category === categoryFilter;
      return inPriceRange && matchesStatus && matchesCategory;
    });
    setListings(filteredListings);

    response = dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, false); 
    if (response !== undefined) {
      setListings(response.data);
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
          <FormControl sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortCategory}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="location">Location</MenuItem>
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>
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
          {(listings.length === 0) && 
            <Typography align="center" variant='h6'>
              No Listings Meet Criteria
            </Typography>
          }
          {listings.map((listing) => (
            <div key={listing.id} onClick={() => handleListingClick(listing.id)}>
              <ListingCard
                id={listing.id}
                title={listing.title}
                price={listing.price}
                location={listing.location}
                status={listing.status}
                category={listing.category}
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
            <FormControl sx={{ minWidth: 120, mt: 2, width: '100%' }}>
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={categoryFilter}
                label="Category"
                onChange={handleCategoryFilterChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
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
