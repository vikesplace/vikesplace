import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import '../App.css';
import DataService from '../services/DataService';

function SearchHistory() {
  const dataService = new DataService();
  
  let id = "";
  let response = dataService.getMyUserData();
  if (response !== undefined && response !== null) {
    id = response.data.userId;
  } else {
    // TODO remove once api works
    id = "12345";
  }

  let history = [];
  response = dataService.getUserSearchHistory(id);
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