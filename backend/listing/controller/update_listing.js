import axios from 'axios';

export const updateListing = async (req, res) => {
    try{
        //Temporary Location until Conversion Setup
        const location = { type: 'Point', coordinates: [1,-1]};
        const response = await axios.patch(`/listing/${req.params.listingId}`,{
                    title: req.body.title,
                    price: req.body.price,
                    status: req.body.status,
                    location: location,
                    category: req.body.category || null,
                });
                res.json(response.data);
    }
    catch(err){
        console.log(err);
    }
};