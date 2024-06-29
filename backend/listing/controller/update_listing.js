import axios from 'axios';

export const updateListing = async (req, res) => {
    try{
        const response = await axios.patch(`/listing/${req.params.listingId}`,{
                    title: req.body.title,
                    price: req.body.price,
                    status: req.body.status,
                    location: req.body.location,
                    category: req.body.category || null,
                    postal_code: req.body.postal_code,
                    buyer_username: req.body.buyer_username || null
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