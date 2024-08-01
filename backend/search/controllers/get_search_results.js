import axios from "axios";
const ALG_SEARCH = process.env.ALG_SEARCH;
const DATA_LAYER = process.env.DATA_LAYER;

export const getSearchResults = async (req, res) => {
  try {
    if (req.query.search == null) {
      res.status(500).json({ message: "internal server error" });
    }

    const userId = res.locals.decodedToken.userId;
    const url = `${DATA_LAYER}user/getUserLatLong/${userId}`; 
    const latLong = await axios.get(url);

    const requestParamsObject = {};
    requestParamsObject.query = req.query.search;  
    const latitude = latLong.data.lat_long.coordinates[0];
    const longitude = latLong.data.lat_long.coordinates[1];

    requestParamsObject.longitude = longitude;
    requestParamsObject.latitude = latitude;

    requestParamsObject.user_id = userId;

    if (req.query.category) {
      requestParamsObject.category = req.query.category;
    }

    if (req.query.sortBy == "distance") {
      requestParamsObject.sortBy = "lat_long";
    }else if (req.query.sortBy == "created_on") {
      requestParamsObject.sortBy = "listed_at";
    }else if (req.query.sortBy) {
      requestParamsObject.sortBy = req.query.sortBy;
    }

    if (req.query.minPrice) {
      requestParamsObject.minPrice = req.query.minPrice;
    }

    if (req.query.maxPrice) {
      requestParamsObject.maxPrice = req.query.maxPrice;
    }

    if (req.query.pullLimit) {
      requestParamsObject.pullLimit = req.query.pullLimit;
    }

    if (req.query.pageOffset) {
      requestParamsObject.pageOffset = req.query.pageOffset;
    }

    if (req.query.status) {
      requestParamsObject.status = req.query.status;
    }

    if (req.query.isDescending) {
      requestParamsObject.isDescending = req.query.isDescending;
    }
    
    const response = await axios.get(`${ALG_SEARCH}search`, {
      params: requestParamsObject,
    });

    if (response.data.status == 200) {
      const listings = response.data.results.listings.map((listing) => {
        return {
          sellerId: listing.seller_id,
          listingId: listing.listing_id,
          location: listing.location,
          category: listing.category,
          price: listing.price,
          listedAt: listing.listed_at,
          status: listing.status,
          title: listing.title,
          lastUpdatedAt: listing.last_updated_at,
          forCharity: listing.for_charity
        };
      });

      const users = response.data.results.users.map((user) => {
        return {
          username: user.username,
          userId: user.user_id,
        };
      });

      res.json({ listings: listings, users: users });
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
