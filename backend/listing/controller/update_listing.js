import axios from 'axios';
import { apiConfig } from '../config/apiConfig.js';

export const updateListing = async (req, res) => {
    try{
        const response = await axios.patch(`${apiConfig.DATA_LAYER}listing/${req.params.listingId}`,{
                    title: req.body.title,
                    price: req.body.price,
                    status: req.body.status,
                    lat_long: req.body.lat_long,
                    category: req.body.category,
                    location: req.body.location,
                    buyer_username: req.body.buyer_username || null,
                    for_charity: req.body.for_charity || false
                });
                res.json(response.data);
    }
    catch(err){
        if (err.response && (err.response.status == 400)) { // if bad request, return error to client
            return res.status(400).json({ message: err.response.data.message });
        } else { // if internal server error, log error and return message to client
            console.error(err);
            return res.status(500).json({ message: "Failed to update listing"});
        }
    }
};