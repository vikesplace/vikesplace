import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import DataService from '../services/DataService';

function SearchHistory() {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchHistory = async () => {
      const dataService = new DataService();
      const response = await dataService.getUserSearchHistory();
      if (response && response.data && response.data.searches) {
        setHistory(response.data.searches);
      }
    };

    fetchHistory();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Box mt={2}>
        {history.length > 0 ? (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Search Query</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((query, index) => (
                    <TableRow key={index}>
                      <TableCell>{query}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={history.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50]}
            />
          </>
        ) : (
          <Box>No Search History is Available</Box>
        )}
      </Box>
    </Container>
  );
}

export default SearchHistory;
