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
        return res.json(response.data); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to get recommendations" });
    }
};