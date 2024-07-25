import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ListingCard({ id, title, price, location, status }) {
  return (
    <Card data-testid="listing-card">
      <CardActionArea component={Link} to={`/listings/${id}`}>
        <CardHeader title={title} />
        <CardContent>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1' sx={{ fontSize: 18, fontWeight: 'bold',  textAlign: 'left' }}>
                $ {price}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1' sx={{ fontSize: 16, textAlign: { sm: 'center', xs: 'left' } }}>
              {location}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body1' sx={{ fontSize: 16, textAlign: { sm: 'right', xs: 'left' } }}>
              {status}
            </Typography>
          </Grid>
        </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
