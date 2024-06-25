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
  let response = dataService.getUserSearchHistory(id);
  if (response !== undefined) {
    history = response.data;
  }
  console.log(history);

  return (
    <div className="SearchHistory">
      <Container>
        <Box mt={2}>
            Search History is coming soon!
          {/* TODO Display history variable in nice format */}
        </Box>
      </Container>
    </div>
  );
}

export default SearchHistory;