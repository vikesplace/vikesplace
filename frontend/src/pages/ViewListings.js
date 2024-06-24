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

const initialListings = [
  { id: '4', title: 'Test 1', price: '2.00', location: 'V9VW9W', status: 'AVAILABLE', category: 'Sports' },
  { id: '10', title: 'Super cool object', price: '3.45', location: 'V9VW9W', status: 'SOLD', category: 'Health' },
  { id: '100', title: 'Buy Me!', price: '1234.56', location: 'V9VW9W', status: 'AVAILABLE', category: 'Office Supplies' },
  { id: '3', title: 'Another listing for sale', price: '98765432.10', location: 'V9VW9W', status: 'AVAILABLE', category: 'Sports' },
  
];

const categories = [
  'Electronics', 'Phones', 'Vehicles', 'Entertainment', 'Garden', 'Outdoor', 'Sports', 'Kitchen Supplies', 'Furniture', 'Musical Instruments', 'Office Supplies', 'Apparel', 'Books', 'Beauty', 'Health'
];

function ViewListings() {
  const navigate = useNavigate();
  const [sortCategory, setSortCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [listings, setListings] = useState(initialListings);
  const [open, setOpen] = useState(false);

  const handleListingClick = (id) => {
    navigate(`/listings/${id}`);
  };

  const handleSortChange = (event) => {
    const category = event.target.value;
    setSortCategory(category);

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
    const filteredListings = initialListings.filter(listing => {
      const inPriceRange = (priceRange.min === '' || parseFloat(listing.price) >= parseFloat(priceRange.min)) &&
                          (priceRange.max === '' || parseFloat(listing.price) <= parseFloat(priceRange.max));
      const matchesStatus = statusFilter === '' || listing.status === statusFilter;
      const matchesCategory = categoryFilter === '' || listing.category === categoryFilter;
      return inPriceRange && matchesStatus && matchesCategory;
    });
    setListings(filteredListings);
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
              <MenuItem value="category">Category</MenuItem>
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
                category={listing.category}
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
