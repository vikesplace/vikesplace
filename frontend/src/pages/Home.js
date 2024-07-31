import { React, useEffect, useState, useMemo } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "../App.css";
import RecommendedGrid from "../components/recommender/RecommendedGrid.js";
import { Typography } from "@mui/material";
import { useSearch } from "../components/searchbar/searchContext.js";
import DataService from "../services/DataService.js";

function Home() {
  const { setShowSearch } = useSearch();

  const dataService = useMemo(() => new DataService(), []);

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {

    const fetchRecommendations = async () => {
      const response = await dataService.getRecommendations();
  
      if ( response === undefined ||response.status !== 200) {
        setRecommendations([]);
      } else if (response.status === 200) {
        setRecommendations(response.data);
      }
    };

    fetchRecommendations();

  }, [dataService]);

  useEffect(() => {
    setShowSearch(true);

    return () => setShowSearch(false);
  }, [setShowSearch]);

  return (
    <div className="Home">
      <Container>
        <Box mt={2}>
          <Typography variant="h5">Top picks for you</Typography>
          <br />
          <RecommendedGrid data={recommendations}/>
          {/* Add your main content here */}
        </Box>
      </Container>
    </div>
  );
}

export default Home;
