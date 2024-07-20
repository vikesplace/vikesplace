import axios from "axios";
import { calculateDistance } from "../helper/calculate_distance.js";
import { apiConfig } from "../config/apiConfig.js";
import redisClient from "../helper/redis_client.js";

export const getSortedListings = async (req, res) => {
  try {
    const userId = res.locals.decodedToken.userId;
    const userKey = `user:${userId}`;
    const listingsKey = `listings:${JSON.stringify(req.query)}`;

    // Check if user coordinates are in the cache
    let userCoordinates;
    const cachedUserCoordinates = await redisClient.get(userKey);
    if (cachedUserCoordinates) {
      userCoordinates = JSON.parse(cachedUserCoordinates);
    } else {
      const user = await axios.get(`${apiConfig.DATA_LAYER}user/getUserLatLong/${userId}`);
      userCoordinates = user.data.lat_long.coordinates;
      await redisClient.set(userKey, JSON.stringify(userCoordinates), { EX: 3600 });
    }

    // Check if listings data is in the cache
    const cachedListings = await redisClient.get(listingsKey);
    if (cachedListings) {
      return res.json(JSON.parse(cachedListings));
    }

    const response = await axios.get(`${apiConfig.DATA_LAYER}listing`, {
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
        if (calculateDistance(userCoordinates, listing.lat_long.coordinates)) {
          return listing;
        }
      });

      // Cache the filtered listings
      await redisClient.set(listingsKey, JSON.stringify(filteredKm), { EX: 3600 });

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
