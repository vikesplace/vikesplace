import React from "react";
import "./RecommendedList.css";
import 'react-multi-carousel/lib/styles.css';
import RecommendedItem from "./RecommendedItem";
import { Container, Grid } from "@mui/material";

function RecommendedGrid({ data }) {

  return (
      <Container>
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={item.listingId} >
              <div key={item.listingId} >
              <RecommendedItem
                id={item.listingId}
                title={item.title}
                price={item.price}
                status={item.status}
                location={item.location}
                forCharity = {item.forCharity}
              />
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
  );
}

export default RecommendedGrid;
