import axios from 'axios';

export const getListingInfo = async (req, res) => {     
    try{
        const response = await axios.get(`/listing/${req.params.listingId}`);
        res.json(response.data);
    }
    catch(err){
        console.log(err);
    }
};