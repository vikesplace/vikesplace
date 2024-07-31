import axios from 'axios';
import { apiConfig } from '../config/apiConfig.js';

export const getRecommendations = async (req, res) => {
    try {
        const userId = res.locals.decodedToken.userId;

        //get latitude and longitude from datalayer
        const user_location = await axios.get(`${apiConfig.DATA_LAYER}user/getUserLatLong/${userId}`);
        console.log(user_location.data);

        //get recommended listings from alg recommendation
        const response = await axios.get(`${apiConfig.ALG_RECOMMENDATION}recommendations` , 
            { params: 
                { 
                    user_id: userId, 
                    latitude: user_location.data.lat_long.coordinates[0], 
                    longitude: user_location.data.lat_long.coordinates[1]
                } 
            });
        //from the reponse.data, change all the keys to camelCase
        response.data.forEach((listing) => {
            listing.listingId = listing.listing_id;
            listing.sellerId = listing.seller_id;
            listing.buyerUsername = listing.buyer_username;
            listing.listedAt = listing.listed_at;
            listing.lastUpdatedAt = listing.last_updated_at;
            listing.forCharity = listing.for_charity;
            delete listing.listing_id;
            delete listing.seller_id;
            delete listing.buyer_username;
            delete listing.listed_at;
            delete listing.last_updated_at;
            delete listing.for_charity;
        });
        return res.json(response.data); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to get recommendations" });
    }
};