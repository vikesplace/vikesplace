import axios from 'axios';
import { apiConfig } from '../config/apiConfig.js';

export const updateUserData = async (req, res) => {
    let geoPointLocation = null;
    try{
        // get the lat,long geopoint of the provided postal code location
        const geoPoint = await axios.get(`${apiConfig.DATA_LAYER}listing/location/${req.body.location}`);
        geoPointLocation = geoPoint.data;
        
    } catch (geoError) {
        if (geoError.response) { // if bad request, return error to client
            return res.status(geoError.response.status).json({ message: geoError.response.data.message });
        } else { // if internal server error, log error and return message to client
            console.error('Error creating geopoint:', geoError); 
            return res.status(500).json({ message: 'Failed to create listing' }); 
        }
    }
    try{
        const userId = res.locals.decodedToken.userId;
        const response = await axios.patch(`${apiConfig.DATA_LAYER}user/${userId}`,{
                lat_long: geoPointLocation,
                location: req.body.location,
        });
        return res.json(response.data);
    }
    catch(err){
        if (err.response && (err.response.status == 400)) { // if bad request, return error to client
            return res.status(400).json({ message: err.response.data.message });
        } else { // if internal server error, log error and return message to client
            console.error(err);
            return res.status(500).json({ message: "Failed to update user data"});
        }
    }
};