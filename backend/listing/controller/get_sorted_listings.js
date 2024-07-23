import axios from "axios";
import { calculateDistance } from "../helper/calculate_distance.js";
import { apiConfig } from "../config/apiConfig.js";

export const getSortedListings = async (req, res) => {
  if (Number(req.query.minPrice) > Number(req.query.maxPrice)){
    return res.status(400).json({ message: "Min price cannot be greater than max price" });
  }
  try {
    const userId = res.locals.decodedToken.userId;
    const user = await axios.get(`${apiConfig.DATA_LAYER}user/getUserLatLong/${userId}`);
    const userCoordinates = user.data.lat_long.coordinates;

    const response = await axios.get(`${apiConfig.DATA_LAYER}listing`, {
      params: {
        pullLimit: req.query.pullLimit,
        pageOffset: req.query.pageOffset,
        minPrice: req.query.minPrice || 0,
        maxPrice: req.query.maxPrice,
        status: req.query.status,
        sortBy: req.query.sortBy,
        isDescending: req.query.isDescending,
      },
    });

    if (response.data.rows) {
      const filteredKm = response.data.rows.filter((listing) => {
        if (
          calculateDistance(userCoordinates, listing.lat_long.coordinates) ===
          true
        ) {
          return listing;
        }
      });
      res.json(filteredKm);
    } else {
      res.json(response.data.rows);
    }
  } catch (err) {
    if (err.response && err.response.status == 400) {
      // if bad request, return error to client
      return res.status(400).json({ message: err.response.data.message });
    } else {
      // if internal server error, log error and return message to client
      console.error(err);
      return res.status(500).json({ message: "Failed to get listings" });
    }
  }
};
