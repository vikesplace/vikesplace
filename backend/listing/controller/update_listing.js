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
        console.log(err);
    }
};