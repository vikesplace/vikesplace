import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CharityCard({ id, name, funds, numListings, endDate }) {
  return (
    <Card data-testid="charity-card">
      <CardActionArea component={Link} to={`/charities/${id}`}>
        <CardHeader title={name} />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', width: 1 / 3, flexDirection: 'column', mx: 2, alignItems: 'start' }}>
              <Typography variant='h6'>
                Funds: ${funds}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: 1 / 3, flexDirection: 'column', mx: 2, alignItems: 'center' }}>
              <Typography variant='body1'>
                Listings: {numListings}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: 1 / 3, flexDirection: 'column', mx: 2, alignItems: 'end' }}>
              <Typography variant='body1'>
                End Date: {endDate}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

