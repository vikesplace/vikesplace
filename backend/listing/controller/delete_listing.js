import axios from 'axios';

export const deleteListing = async (req, res) => {
    try{
        const response = await axios.delete(`/listing/${req.params.listing_id}`);
        res.json(response.data);
    }
    catch(err){
        console.log(err);
    }
};