import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';

export default function ListingCard({ id, title, price, location, status }) {
  return (
    <Card>
      <CardActionArea href={'/view-listing/'+id}>
        <CardHeader title={title} />
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <Box sx={{ display: 'flex', width: 1/3, flexDirection: 'column', mx: 2, alignItems: 'start'}}>
                    <Typography variant='h6'>
                        $ {price}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', width: 1/3, flexDirection: 'column', mx: 2, alignItems: 'center'}}>
                    {location}
                </Box>
                <Box sx={{ display: 'flex', width: 1/3, flexDirection: 'column', mx: 2, alignItems: 'end'}}>
                    {status}
                </Box>
            </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
