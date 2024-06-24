import axios from 'axios';

export const createListing = async (req, res) => {
    try{
        //Temporary Location until Conversion Setup
        const location = { type: 'Point', coordinates: [1,-1]};
        const seller_id = res.locals.decodedToken.user_id;
        const response = await axios.post("/listing",{
                    title: req.body.title,
                    //Temporary Seller ID in post. Will be retrieved from JWT
                    seller_id: seller_id,
                    price: req.body.price,
                    location: location,
                    category: req.body.category || null,
                });
                res.json(response.data);
    }
    catch(err){
        console.log(err);
    }
};