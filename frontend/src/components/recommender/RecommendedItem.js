import * as React from "react";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import './RecommendedItem.css'
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DataService from "../../services/DataService";

/* This component is a just a card for the Recommender Items..
 * can be used for ListingCards as well if wanted
 */

function RecommendedItem(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const dataService = new DataService()


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const open = Boolean(anchorEl);

  const handleIgnoreItem = async (id) => {

    const response = await dataService.ignoreRecommendation(id)

    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="card" key={props.id}>
      <Card className="card">
        <CardActionArea component={Link} to={`/listings/${props.id}`}>
          <CardContent sx={{overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'balance', display: ''}}>
            <Typography variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.status}
            </Typography>
            <Typography variant="body1">
              {props.price}
              <br />
            </Typography>
            
          </CardContent>
        </CardActionArea>
        <Box ml ={2}justifyContent='space-between' display='flex' alignItems='center'>
              <Typography variant="body1">
                {props.location}
              </Typography>
              <Button onClick={handleIgnoreItem}> Ignore </Button>

              {/* <IconButton aria-label="more"
                onClick={handleClick}
                aria-haspopup='true'
                aria-controls="long-menu"
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                onClose={handleClose}
                open={open}
              >
                <MenuItem key='Ignore Item' onClick={handleIgnoreItem(props.id)}>
                  Ignore Item
                </MenuItem>
              </Menu> */}

            </Box>
      </Card>
    </div>
  );
}

export default RecommendedItem;
