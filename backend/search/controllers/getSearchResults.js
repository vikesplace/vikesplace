import axios from "axios";

export const getSearchResults = async (req, res) => {
  try {
    //Get seller_id from JWT token
    //http://localhost:8000/search?query=<query goes here>&location=<lat value>&location=<lon value>
    //Get Long and Lat depending on user_id
    const longitude = 48;
    const latitude = -123;
    const response = await axios.get(`/search`, {
      params: { query: req.query.search, longitude: longitude, latitude: latitude, category: req.query.category },
    });
    if (response.status == 200) {
      res.json(response.data);
    } else {
      res.json(response.data);
    }
  } catch (err) {
    console.log(err);
  }
};