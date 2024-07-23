import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CharityCard({ id, name, funds, numListings, endDate }) {
  return (
    <Card data-testid="charity-card">
      <CardActionArea component={Link} to={`/charities/${id}`}>
        <CardHeader title={name} />
        <CardContent>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Typography variant='body1' sx={{ fontSize: 18, fontWeight: 'bold',  textAlign: 'left' }}>
                Funds: ${funds}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='body1' sx={{ fontSize: 16, textAlign: { sm: 'center', xs: 'left' } }}>
                Listings: {numListings}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant='body1' sx={{ fontSize: 16, textAlign: { sm: 'right', xs: 'left' } }}>
                End Date: {endDate}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

