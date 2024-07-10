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
    const latitude = user.data.user.lat_long.coordinates[0];
    const longitude = user.data.user.lat_long.coordinates[1];

    requestParamsObject.longitude = longitude;
    requestParamsObject.latitude = latitude;

    if (req.query.category) {
      requestParamsObject.category = req.query.category;
    }

    const response = await axios.get(`${ALG_SEARCH}search`, {
      params: requestParamsObject,
    });

    if (response.data.status == 200 && response.data.results.listings) {
      const listings = response.data.results.listings.map((listing) => {
        return {
          sellerId: listing.seller_id,
          listingId: listing.listing_id,
          price: listing.price,
          listedAt: listing.listed_at,
          status: listing.status,
          title: listing.title,
          lastUpdatedAt: listing.last_updated_at,
          location: listing.location,
        };
      });

      res.json(listings);
    } else {
      res.json({ message: "Failed to get listings" });
    }
  } catch (error) {
    if (error.response && error.response.status == 400) {
      // if bad request, return error to client
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    } else {
      // if internal server error, log error and return message to client
      console.error("Error searching:", error);
      return res.status(500).json({ message: "Error searching" });
    }
  }
};
