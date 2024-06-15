import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../App.css';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';

const initialListings = [
  { id: '4', title: 'Test 1', price: '2.00', location: 'V9VW9W', status: 'AVAILABLE' },
  { id: '10', title: 'Super cool object', price: '3.45', location: 'V9VW9W', status: 'SOLD' },
  { id: '100', title: 'Buy Me!', price: '1234.56', location: 'V9VW9W', status: 'AVAILABLE' },
  { id: '3', title: 'Another listings for sale', price: '98765432.10', location: 'V9VW9W', status: 'AVAILABLE' }
];

function ViewListings() {
  const navigate = useNavigate();
  
  const [sortCategory, setSortCategory] = useState('');

  const [listings, setListings] = useState(initialListings);

  const handleListingClick = (id) => {
    navigate(`/listings/${id}`);
  };

  const handleSortChange = (event) => {
    const category = event.target.value;
    setSortCategory(category);

    switch (category) {
      case 'price':
        const sortedByPrice = [...listings].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        setListings(sortedByPrice);
        break;
      case 'location':
        const sortedByLocation = [...listings].sort((a, b) => a.location.localeCompare(b.location));
        setListings(sortedByLocation);
        break;
      case 'status':
        const sortedByStatus = [...listings].sort((a, b) => a.status.localeCompare(b.status));
        setListings(sortedByStatus);
        break;
      default:
        setListings(initialListings); 
        break;
    }
  };

  return (
    <div className="ViewListings">
      <Container>
        <SearchBar />
        <Box mt={2}>
          <FormControl sx={{ minWidth: 120 }}>
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
        </Box>
        <Box mt={2}>
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
      </Container>
    </div>
  );
}

export default ViewListings;
