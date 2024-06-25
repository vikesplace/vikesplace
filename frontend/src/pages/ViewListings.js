import React, { useState } from 'react';
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
import '../App.css';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';
import { Typography } from '@mui/material';
import DataService from '../services/DataService';


function ViewListings() {
  const dataService = new DataService();
  const navigate = useNavigate();

  const [sortCategory, setSortCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [statusFilter, setStatusFilter] = useState('');
  const [open, setOpen] = useState(false);

  let listings = [];
  let response = dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, false); 
  if (response !== undefined) {
    listings = response.data;
  } 

  const handleListingClick = (id) => {
    navigate(`/listings/${id}`);
  };

  const handleSortChange = (event) => {
    const category = event.target.value;
    setSortCategory(category);
    response = dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, false); 
    if (response !== undefined) {
      listings = response.data;
    } 
  };

  const handlePriceRangeChange = (event) => {
    const { name, value } = event.target;
    setPriceRange(prevRange => ({ ...prevRange, [name]: value }));
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const applyFilters = () => {
    listings = dataService.getSortedListings(priceRange.min, priceRange.max, statusFilter, sortCategory, false); 
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FilterListIcon />}
            onClick={handleClickOpen}
          >
            Add Filter
          </Button>
        </Box>
        <Box mt={2}>
          {(listings.length === 0) && 
            <Typography align="center" variant='h6'>
              No Listings Meet Criteria
            </Typography>
          }
          {listings.map((listing) => (
            <div key={'div' + listing.id} onClick={() => handleListingClick(listing.id)}>
              <ListingCard
                id={listing.id}
                title={listing.title}
                price={listing.price}
                location={listing.location}
                status={listing.status}
              />
              <br />
            </div>
          ))}
        </Box>
        <Dialog open={open} onClose={handleClose}>
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
              sx={{ mr: 2, mt: 2 }}
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
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={applyFilters} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default ViewListings;
