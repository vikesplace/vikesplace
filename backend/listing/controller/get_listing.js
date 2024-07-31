import axios from 'axios';
import { apiConfig } from '../config/apiConfig.js';
import redisClient from '../helper/redis_client.js';

export const getListingInfo = async (req, res) => {
    try {
        const listingKey = `listing:${req.params.listingId}`;
        
        // Check if listing data is in the cache
        const cachedListing = await redisClient.get(listingKey);
        if (cachedListing) {
            return res.json(JSON.parse(cachedListing));
        }

        const user_id = res.locals.decodedToken.userId;
        axios.post(`${apiConfig.ALG_SEARCH}users/${user_id}/listings/${req.params.listingId}`).catch(err => {
            console.error(err);
        });

        const response = await axios.get(`${apiConfig.DATA_LAYER}listing/${req.params.listingId}`);
        
        // Cache the listing data
        await redisClient.set(listingKey, JSON.stringify(response.data), { EX: 900 });

        res.json(response.data);
    } catch (err) {
        if (err.response && err.response.status == 400) {
            // if bad request, return error to client
            return res.status(400).json({ message: err.response.data.message });
        } else {
            // if internal server error, log error and return message to client
            console.error(err);
            return res.status(500).json({ message: "Failed to get listing" });
        }
    }
};
