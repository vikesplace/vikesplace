import React from 'react';
import TextField from '@mui/material/TextField';
import '../App.css';

function SearchBar() {
  return (
    <TextField id="searchbar" label="Search..." variant="outlined" fullWidth sx={{m: 2}} />
  );
}

export default SearchBar;

