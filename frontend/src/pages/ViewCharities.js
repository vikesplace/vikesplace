import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { Typography } from '@mui/material';
import CharityCard from '../components/CharityCard';
import '../App.css';
import DataService from '../services/DataService';
import { Store } from 'react-notifications-component';

function ViewCharities() {
  const navigate = useNavigate();

  const [currentFuturePage, setCurrentFuturePage] = useState(1);
  const [currentPastPage, setCurrentPastPage] = useState(1);
  const [charities, setCharities] = useState([])
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

  const handleCharityClick = (id) => {
    navigate(`/charities/${id}`);
  };

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
              <div onClick={() => handleCharityClick(sortedCharities.activeEvent.charityId)}>
                <CharityCard
                  id={sortedCharities.activeEvent.charityId}
                  name={sortedCharities.activeEvent.name}
                  numListings={sortedCharities.activeEvent.numListings}
                  endDate={sortedCharities.activeEvent.endDate.substring(0, 10)}
                  funds={sortedCharities.activeEvent.funds}
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
                <div key={charity.charityId} onClick={() => handleCharityClick(charity.charityId)}>
                  <CharityCard
                    id={charity.charityId}
                    name={charity.name}
                    numListings={charity.numListings}
                    endDate={charity.endDate.substring(0, 10)}
                    funds={charity.funds}
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
                <div key={charity.charityId} onClick={() => handleCharityClick(charity.charityId)}>
                  <CharityCard
                    id={charity.charityId}
                    name={charity.name}
                    numListings={charity.numListings}
                    endDate={charity.endDate.substring(0, 10)}
                    funds={charity.funds}
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
      </Container>
    </div>
  );
}

export default ViewCharities;

