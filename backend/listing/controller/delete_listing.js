import axios from 'axios';
import { apiConfig } from '../config/apiConfig.js';

export const deleteListing = async (req, res) => {
    try{
        const response = await axios.delete(`${apiConfig.DATA_LAYER}listing/${req.params.listingId}`);
        res.json(response.data);
    }
    catch(err){
        if (err.response && (err.response.status == 400)) { // if bad request, return error to client
            return res.status(400).json({ message: err.response.data.message });
        } else { // if internal server error, log error and return message to client
            console.error(err);
            return res.status(500).json({ message: "Failed to delete listing"});
        }
}
};