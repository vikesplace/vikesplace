import axios from "axios";
import {
  calculateDistance,
  getDistanceFromUser,
} from "../helper/calculate_distance.js";
import { apiConfig } from "../config/apiConfig.js";
import redisClient from "../helper/redis_client.js";

export const getSortedListings = async (req, res) => {
  if (Number(req.query.minPrice) > Number(req.query.maxPrice)) {
    return res
      .status(400)
      .json({ message: "Min price cannot be greater than max price" });
  }
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
      const user = await axios.get(
        `${apiConfig.DATA_LAYER}user/getUserLatLong/${userId}`
      );
      userCoordinates = user.data.lat_long.coordinates;
      await redisClient.set(userKey, JSON.stringify(userCoordinates), {
        EX: 900,
      });
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
        minPrice: req.query.minPrice || 0,
        maxPrice: req.query.maxPrice,
        status: req.query.status,
        sortBy: req.query.sortBy,
        isDescending: req.query.isDescending,
      },
    });

    if (response.data.rows) {
      if (req.query.sortBy === "distance") {
        //WillSort
        const isDescending = req.query.isDescending;

        const distancekm = response.data.rows.filter((listing) =>
          calculateDistance(userCoordinates, listing.lat_long.coordinates)
        );

        const sortDistance = distancekm.sort((a, b) => {
          if (isDescending) {
            const result =
              getDistanceFromUser(userCoordinates, b.lat_long.coordinates) -
              getDistanceFromUser(userCoordinates, a.lat_long.coordinates);
            return result > 0 ? -1 : 1;
          } else {
            const result =
              getDistanceFromUser(userCoordinates, a.lat_long.coordinates) -
              getDistanceFromUser(userCoordinates, b.lat_long.coordinates);
            return result > 0 ? 1 : -1;
          }
        });

        const filteredKm = sortDistance.map((listing) => ({
          listingId: listing.listing_id,
          sellerId: listing.seller_id,
          buyerUsername: listing.buyer_username,
          title: listing.title,
          price: listing.price,
          location: listing.location,
          status: listing.status,
          listedAt: listing.listed_at,
          lastUpdatedAt: listing.last_updated_at,
          category: listing.category,
          forCharity: listing.for_charity,
        }));

        // Cache the filtered listings
        await redisClient.set(listingsKey, JSON.stringify(filteredKm), {
          EX: 5,
        });

        res.json(filteredKm);
      } else {
        const filteredKm = response.data.rows
          .filter((listing) =>
            calculateDistance(userCoordinates, listing.lat_long.coordinates)
          )
          .map((listing) => ({
            listingId: listing.listing_id,
            sellerId: listing.seller_id,
            buyerUsername: listing.buyer_username,
            title: listing.title,
            price: listing.price,
            location: listing.location,
            status: listing.status,
            listedAt: listing.listed_at,
            lastUpdatedAt: listing.last_updated_at,
            category: listing.category,
            forCharity: listing.for_charity,
          }));
        // Cache the filtered listings
        await redisClient.set(listingsKey, JSON.stringify(filteredKm), {
          EX: 5,
        });

        res.json(filteredKm);
      }
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
