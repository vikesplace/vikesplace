import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import DataService from '../services/DataService';

{/* <Box sx={{ display: 'flex', alignItems: 'center', m: 2}}>
<Box sx={{display: 'flex', width: 1/3, flexDirection: 'column'}} />
<Box sx={{display: 'flex', width: 1/3, flexDirection: 'column'}}> 
  <TextField id="searchbar" label="Search..." variant="outlined" input />
</Box>
<IconButton > <SearchIcon/> </IconButton>
<IconButton children={<HistoryIcon />} href='/history'/> 
</Box>*/}

function SearchBar() {
  const dataService = new DataService();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserInput = (event) => {
    setInput(event.target.value);
    console.log(input)
  };

  const handleSearchQuery= (event) => {
    if(location.pathname ="/"){
      navigate("/view-listings")
    }
    let response = dataService.search(input)
    console.log(response)
    
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
      <Box sx={{display: 'flex', width: 1/3, flexDirection: 'column'}} />
     
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search vikes place' }}
          onChange={handleUserInput}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchQuery}>
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="search-history">
          <HistoryIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default SearchBar;

