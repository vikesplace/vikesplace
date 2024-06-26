import axios from "axios";
const ALG_SEARCH = process.env.ALG_SEARCH;
const DATA_LAYER = process.env.DATA_LAYER;

export const getSearchResults = async (req, res) => {
  try {
    if (req.query.query == null) {
      res.status(500).json({ message: "internal server error" });
    }

    const userId = res.locals.decodedToken.userId;
    const url = `${DATA_LAYER}user/${userId}`;
    const user = await axios.get(url);

    const requestParamsObject = {};
    requestParamsObject.query = req.query.query;
    const longitude = user.data.user.location.coordinates[0];
    const latitude = user.data.user.location.coordinates[1];

    requestParamsObject.longitude = longitude;
    requestParamsObject.latitude = latitude;

    if(req.query.category){
      requestParamsObject.category = req.query.category;
    }

    const response = await axios.get(`${ALG_SEARCH}search`, {
      params: requestParamsObject,
    });
    const listings = response.data.results.listings.map((listing) => {
      listing.location = listing.postal_code;
      delete listing.postal_code;
      return listing;
    });

    if(response.data.status == 200){
      res.json(listings);
    }
    else{
      res.json({message: "Failed to get listings"});
    }
    
  } catch (err) {
    console.log(err);
    res.json({message: err});
  }
};
