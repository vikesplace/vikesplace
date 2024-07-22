import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { Typography } from '@mui/material';
import CharityCard from '../components/CharityCard';
import { SAMPLE_CHARITY } from '../utils/SampleRecommenderData';
import '../App.css';

function ViewCharities() {
  const navigate = useNavigate();

  const [currentFuturePage, setCurrentFuturePage] = useState(1);
  const [currentPastPage, setCurrentPastPage] = useState(1);
  const itemsPerPage = 5;

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
    const activeEvent = SAMPLE_CHARITY.find(charity => charity.status === 'ACTIVE');
    const futureEvents = SAMPLE_CHARITY.filter(charity => charity.status === 'FUTURE');
    const pastEvents = SAMPLE_CHARITY.filter(charity => charity.status === 'PAST');

    return {
      activeEvent,
      futureEvents,
      pastEvents,
    };
  }, []);

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
                  endDate={sortedCharities.activeEvent.endDate}
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
                    endDate={charity.endDate}
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
                    endDate={charity.endDate}
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

