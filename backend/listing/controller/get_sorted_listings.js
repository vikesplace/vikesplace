import axios from "axios";
import { calculateDistance } from "../helper/calculate_distance.js";

export const getSortedListings = async (req, res) => {
  try {
    const userId = res.locals.decodedToken.userId;
    const user = await axios.get(`/user/${userId}`);
    const userCoordinates = user.data.user.location.coordinates;

    const response = await axios.get(`/listing`, {
      params: {
        pullLimit: req.query.pullLimit,
        pageOffset: req.query.pageOffset,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        status: req.query.status,
        sortBy: req.query.sortBy,
        isDescending: req.query.isDescending,
      },
    });

    if (response.data.rows) {
      const filteredKm = response.data.rows.filter((listing) => {
        if (
          calculateDistance(userCoordinates, listing.location.coordinates) ===
          true
        ) {
          return true;
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
