import axiosInstance from "../config/axios.js";

export const getListingInfo = async (req, res) => {     
    try{
        // retrieve listing id from request url
        const listingId = req.params.listingId;
        const location = { type: 'Point', coordinates: [1,-1]};
        //retrieve listing information from database
        const response = await axiosInstance.get(`/listing/${listingId}`);
        
        console.log(response);
        res.json(response.data);
    }
    catch(err){
        console.log(err);
    }
};