import {React, useMemo}from "react";

import Card from "@mui/material/Card";
import { Store } from "react-notifications-component";
import CardContent from "@mui/material/CardContent";
import './RecommendedItem.css'
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea} from "@mui/material";
import { Link } from "react-router-dom";

import DataService from "../../services/DataService";

/* This component is a just a card for the Recommender Items..
 * can be used for ListingCards as well if wanted
 */

function RecommendedItem(props) {


  const dataService = useMemo(() => new DataService(), []); 


  async function handleIgnoreItem (id) {
   
    let response = await dataService.ignoreRecommendation(id)

    if(response.status === undefined){
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
    }

    window.location.reload();
    

  }

  

  return (
    <div className="card" key={props.id}>
      <Card className="card">
        <CardActionArea component={Link} to={`/listings/${props.id}`}>
          <CardContent sx={{overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: ''}}>
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
              <Button onClick={ ()=> handleIgnoreItem(props.id)}> Ignore </Button>

            </Box>
      </Card>
    </div>
  );
}

export default RecommendedItem;
