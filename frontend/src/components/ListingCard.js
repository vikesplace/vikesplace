import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ListingCard({ id, title, price, location, status, forCharity }) {
  return (
    <Card data-testid="listing-card">
      <CardActionArea component={Link} to={`/listings/${id}`}>
        <CardHeader title={title} />
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', width: 1 / 4, flexDirection: 'column', mx: 2, alignItems: 'start' }}>
              <Typography variant='h6'>
                $ {price}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', width: 1 / 4, flexDirection: 'column', mx: 2, alignItems: 'center' }}>
              {location}
            </Box>
            <Box sx={{ display: 'flex', width: 1 / 4, flexDirection: 'column', mx: 2, alignItems: 'center' }}>
              {status}
            </Box>
            <Box sx={{ display: 'flex', width: 1 / 4, flexDirection: 'column', mx: 2, alignItems: 'end' }}>
              <Typography variant='body2' color={forCharity ? 'success.main' : 'text.secondary'}>
                {forCharity ? 'For Charity: Yes' : 'For Charity: No'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
