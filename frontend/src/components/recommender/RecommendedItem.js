import * as React from "react";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import './RecommendedItem.css'
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

/* This component is a just a card for the Recommender Items..
 * can be used for ListingCards as well if wanted
 */

function RecommendedItem(props) {
  return (
    <div className="card" >
    <Card >
      <CardActionArea component={Link} to={`/listings/${props.id}`}>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {props.status}
          </Typography>
          <Typography variant="body1">
            {props.price}
            <br />
            {props.location}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}

export default RecommendedItem;
