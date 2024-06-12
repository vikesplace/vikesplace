import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';
import '../App.css';

function SearchBar() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', m: 2}}>
      <Box sx={{display: 'flex', width: 1/3, flexDirection: 'column'}} />
      <Box sx={{display: 'flex', width: 1/3, flexDirection: 'column'}}> 
        <TextField id="searchbar" label="Search..." variant="outlined" />
      </Box>
      <IconButton children={<HistoryIcon />} href='/history'/>
    </Box>
  );
}

export default SearchBar;

