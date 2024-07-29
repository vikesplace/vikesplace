import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import '../../App.css';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { useLocation, useNavigate } from 'react-router';
import { useSearch } from './searchContext';

function SearchBar() {
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();
  const { showSearch, setSearchQuery} = useSearch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home') {

      //if user navigates to homepage clear the input in search bar
      setUserInput('');
      //if user navigates to homepage clear the searchQuery in search bar context 
      setSearchQuery('');
    }
  }, [location, setSearchQuery]);

  if (!showSearch) {
    return null;
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSearch = () => {
    if(userInput){
      setSearchQuery(userInput);
      if (location.pathname === "/home") {
        navigate("/view-listings");
      }     
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleHistoryClick = () => {
    navigate('/history');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', m: 2 }}>
      <Box sx={{ display: 'flex', width: 1 / 3, flexDirection: 'column' }} />

      <Paper 
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
        name='search-bar'
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search vikes place' }}
          onChange={handleUserInput}
          value={userInput}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: '10px' }}
          aria-label="search-history"
          onClick={handleHistoryClick}
        >
          <HistoryIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default SearchBar;
