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
import Pagination from '@mui/material/Pagination';
import '../App.css';
import ListingCard from '../components/ListingCard';
import { Typography } from '@mui/material';
import DataService from '../services/DataService';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import IconButton from '@mui/material/IconButton';
import { Store } from 'react-notifications-component';
import { useSearch } from '../components/searchbar/searchContext';

function ViewListings() {
  const dataService = useMemo(() => new DataService(), []);
  const navigate = useNavigate();

  const [sortCategory, setSortCategory] = useState("created_on");
  const [sortOrder, setSortOrder] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [statusFilter, setStatusFilter] = useState('');
  const [location, setLocation] = useState('Fetching...');
  const [listings, setListings] = useState([]);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openLocationDialog, setOpenLocationDialog] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { setShowSearch, searchQuery } = useSearch();

  useEffect(() => {
    setShowSearch(true);
    return () => setShowSearch(false);
  }, [setShowSearch]);

  useEffect(() => {

    const fetchListings = async () => {
      const response = await dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, sortOrder);
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
        setListings(response.data);
      } else {
        Store.addNotification({
          title: 'Unable to Get Listings',
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
    };

    const fetchLocation = async () => {
      const response = await dataService.getMyUserData();
      setLocation(response !== undefined ? response.data.location : "Please Reload");
    };

    const search = async () => {
      const response = await dataService.search(searchQuery)

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
        setListings(response.data)
      } else {
        Store.addNotification({
          title: 'Unable to Search Listings',
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

    //if there is a search query run that otherwise just fetchlistings
    if (searchQuery) {
      search();
    } else {
      fetchListings();
    }

    fetchLocation();

  }, [dataService, priceRange, statusFilter, sortCategory, sortOrder, searchQuery]);

  const handleListingClick = (id) => {
    navigate(`/listings/${id}`);
  };

  const handleSortChange = async (event) => {
    const category = event.target.value;
    setSortCategory(category);

    const response = await dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, sortOrder);
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
      setListings(response.data);
    } else {
      Store.addNotification({
        title: 'Unable to Get Listings',
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
  };

  const handleSortOrderClick = async () => {
    const currOrder = sortOrder;
    setSortOrder(!currOrder);

    const response = await dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, sortOrder);
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
      setListings(response.data);
    } else {
      Store.addNotification({
        title: 'Unable to Get Listings',
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
      setListings(response.data);
    } else {
      Store.addNotification({
        title: 'Unable to Get Listings',
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
    var format = new RegExp("^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy][0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][0-9][ABCEGHJKLMNPRSTVWXYZabceghjklmnprstvwxyz][0-9]$");
    if (!format.test(code)) {
      setPostalCodeError(true);
      return false;
    } else {
      setPostalCodeError(false);
      return true;
    }
  };

  const applyNewLocation = async () => {
    if (validatePostalCode(newLocation)) {
      const upperPostal = newLocation.toUpperCase();
      const response = await dataService.updateUserData(upperPostal);
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
        setLocation(upperPostal);
      } else {
        Store.addNotification({
          title: 'Unable to Update Location',
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
      setOpenLocationDialog(false);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedListings = listings.slice((currentPage - 1) * itemsPerPage, (currentPage) * itemsPerPage);

  return (
    <div className="ViewListings">
      <Container>
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
                <MenuItem value="created_on"><em>Time</em></MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="distance">Distance</MenuItem>
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
        <Pagination
          count={Math.ceil(listings.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
        />
        <Box mt={2}>
          {(listings === undefined || listings.length === 0) &&
            <Typography align="center" variant='h6'>
              No Listings Meet Criteria
            </Typography>
          }
          {listings !== undefined && paginatedListings.map((listing) => (
            <div key={listing.listingId} onClick={() => handleListingClick(listing.listingId)}>
              <ListingCard
                id={listing.listingId}
                title={listing.title}
                price={listing.price}
                location={listing.location}
                status={listing.status}
                forCharity={listing.forCharity} 
              />
              <br />
            </div>
          ))}
        </Box>
        <Pagination
          count={Math.ceil(listings.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
        />
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
            <FormControl fullWidth sx={{ mt: 2 }}>
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
            <Button onClick={handleCloseFilterDialog}>Cancel</Button>
            <Button onClick={applyFilters}>Apply</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openLocationDialog} onClose={handleCloseLocationDialog}>
          <DialogTitle>Enter New Location</DialogTitle>
          <DialogContent>
            <TextField
              label="Postal Code"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              fullWidth
              error={postalCodeError}
              helperText={postalCodeError ? "Invalid postal code format" : ""}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLocationDialog}>Cancel</Button>
            <Button onClick={applyNewLocation}>Apply</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default ViewListings;
