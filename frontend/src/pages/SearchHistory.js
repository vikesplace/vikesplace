import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import AuthService from '../services/AuthService';
import DataService from '../services/DataService';

function SearchHistory() {
  const authService = new AuthService();
  const dataService = new DataService();
  const id = authService.getCurrentUserId();

  let history = [];
  try {
    history = dataService.getUserSearchHistory(id);
    console.log(history);
  } catch (error) {
    // TODO display error message
    console.log(error);
  }

  return (
    <div className="SearchHistory">
      <Container>
        <Box mt={2}>
            SearchHistory
          {/* TODO Display history variable in nice format */}
        </Box>
      </Container>
    </div>
  );
}

export default SearchHistory;