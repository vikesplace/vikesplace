import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardHeader } from '@mui/material';

export default function CharityCard({ name, funds, numListings, endDate }) {
  return (
    <Card data-testid="charity-card">
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
    </Card>
  );
}

