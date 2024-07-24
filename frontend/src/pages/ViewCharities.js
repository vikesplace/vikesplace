import React, { useState, useMemo, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CharityCard from '../components/CharityCard';
import CharityDetails from '../components/CharityDetails';
import '../App.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DataService from '../services/DataService';
import { Store } from 'react-notifications-component';

function ViewCharities() {
  const [currentFuturePage, setCurrentFuturePage] = useState(1);
  const [currentPastPage, setCurrentPastPage] = useState(1);
  const [charities, setCharities] = useState([]);
  const [isViewingCharity, setIsViewingCharity] = useState(false);
  const [viewCharity, setViewCharity] = useState({});
  const itemsPerPage = 5;

  useEffect(() => {
    async function getCharities() {
      const dataService = new DataService();
      const response = await dataService.getCharities();
      if (response === undefined) {
        Store.addNotification({
          title: 'Connection Error!',
          message: 'Please try again',
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      } else if (response.status === 200) {
        setCharities(response.data);
      } else {
        Store.addNotification({
          title: 'Unable to Get Listings',
          message: 'Please try again',
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      }
    }

    getCharities();
  }, []);

  const handleCharityClick = (charity) => {
    setIsViewingCharity(true);
    setViewCharity(charity);
  };

  const handleCharityClose = () => {
    setIsViewingCharity(false);
    setViewCharity({});
  }

  const handleFuturePageChange = (event, value) => {
    setCurrentFuturePage(value);
  };

  const handlePastPageChange = (event, value) => {
    setCurrentPastPage(value);
  };

  const sortedCharities = useMemo(() => {
    const orderedCharities = charities.sort(charity => charity.endDate).filter(charity => charity.status === 'OPEN');
    const activeEvent = orderedCharities.shift();
    const futureEvents = orderedCharities;
    const pastEvents = charities.filter(charity => charity.status === 'CLOSED');

    return {
      activeEvent,
      futureEvents,
      pastEvents,
    };
  }, [charities]);

  const paginatedFutureCharities = sortedCharities.futureEvents.slice((currentFuturePage - 1) * itemsPerPage, currentFuturePage * itemsPerPage);
  const paginatedPastCharities = sortedCharities.pastEvents.slice((currentPastPage - 1) * itemsPerPage, currentPastPage * itemsPerPage);

  return (
    <div className="ViewCharities">
      <Container>
        <Box mt={2}>
          {sortedCharities.activeEvent && (
            <>
              <Typography variant="h6" gutterBottom>
                Current Event:
              </Typography>
              <div onClick={() => handleCharityClick(sortedCharities.activeEvent)}>
                <CharityCard
                  id={sortedCharities.activeEvent.charityId}
                  name={sortedCharities.activeEvent.name}
                  numListings={sortedCharities.activeEvent.numListings}
                  endDate={sortedCharities.activeEvent.endDate.substring(0, 10)}
                  funds={sortedCharities.activeEvent.fund}
                  status={sortedCharities.activeEvent.status}
                />
                <br />
              </div>
              <br />
              <br />
            </>
          )}

          {sortedCharities.futureEvents.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom>
                Future Events:
              </Typography>
              {paginatedFutureCharities.map((charity) => (
                <div key={charity.charityId} onClick={() => handleCharityClick(charity)}>
                  <CharityCard
                    id={charity.charityId}
                    name={charity.name}
                    numListings={charity.numListings}
                    endDate={charity.endDate.substring(0, 10)}
                    funds={charity.fund}
                    status={charity.status}
                  />
                  <br />
                </div>
              ))}
              <Pagination 
                count={Math.ceil(sortedCharities.futureEvents.length / itemsPerPage)} 
                page={currentFuturePage} 
                onChange={handleFuturePageChange} 
                sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
              />
            </>
          )}

          {sortedCharities.pastEvents.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom>
                Past Events:
              </Typography>
              {paginatedPastCharities.map((charity) => (
                <div key={charity.charityId} onClick={() => handleCharityClick(charity)}>
                  <CharityCard
                    id={charity.charityId}
                    name={charity.name}
                    numListings={charity.numListings}
                    endDate={charity.endDate.substring(0, 10)}
                    funds={charity.fund}
                    status={charity.status}
                  />
                  <br />
                </div>
              ))}
              <Pagination 
                count={Math.ceil(sortedCharities.pastEvents.length / itemsPerPage)} 
                page={currentPastPage} 
                onChange={handlePastPageChange} 
                sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
              />
            </>
          )}

          {(sortedCharities.activeEvent === undefined &&
            sortedCharities.futureEvents.length === 0 &&
            sortedCharities.pastEvents.length === 0) && 
            <Typography align="center" variant='h6'>
              No Charities Available
            </Typography>
          }
        </Box>
        <Dialog open={isViewingCharity} onClose={handleCharityClose} maxWidth={'sm'} fullWidth={true}>
          <DialogTitle>View Charity</DialogTitle>
          <DialogContent>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              minHeight="100vh"
              bgcolor="background.paper"
            >
              <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Grid item xs={12} md={8}>
                  <CharityDetails charity={viewCharity} />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCharityClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}

export default ViewCharities;

