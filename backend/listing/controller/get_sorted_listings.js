import axios from "axios";
import { calculateDistance } from "../helper/calculate_distance.js";
import redisClient from "../helper/redis_client.js"; // Import the Redis client

export const getSortedListings = async (req, res) => {
  try {
    const userId = res.locals.decodedToken.userId;
    const user = await axios.get(`/user/getUserLatLong/${userId}`);
    const userCoordinates = user.data.lat_long.coordinates;

    // Generate a unique cache key based on request parameters
    const cacheKey = JSON.stringify({
      userId,
      pullLimit: req.query.pullLimit,
      pageOffset: req.query.pageOffset,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      status: req.query.status,
      sortBy: req.query.sortBy,
      isDescending: req.query.isDescending,
    });

    // Check if data is in Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

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

    let filteredKm;
    if (response.data.rows) {
      filteredKm = response.data.rows.filter((listing) => {
        if (
          calculateDistance(userCoordinates, listing.lat_long.coordinates) ===
          true
        ) {
          return listing;
        }
      });
    } else {
      filteredKm = response.data.rows;
    }

    // Store the result in Redis cache with an expiry time (e.g., 1 hour)
    await redisClient.set(cacheKey, JSON.stringify(filteredKm), 'EX', 3600);

    res.json(filteredKm);
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
