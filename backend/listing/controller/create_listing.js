import axios from 'axios';

export const createListing = async (req, res) => {
    try{
        const seller_id = res.locals.decodedToken.userId;
        const geoPoint = await axios(`/listing/location/${req.body.location}`);
        const geoPointLocation = geoPoint.data;
        const response = await axios.post("/listing",{
                    title: req.body.title,
                    seller_id: seller_id,
                    price: req.body.price,
                    location: geoPointLocation,
                    postal_code: req.body.location,
                    category: req.body.category
                });
                res.json(response.data);
    }
    catch(err){
        console.log(err);
    }
};