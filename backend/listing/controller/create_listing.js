import axios from 'axios';

export const createListing = async (req, res) => {
    try{
        // const seller_id = res.locals.decodedToken.userId;
        const response = await axios.post("/listing",{
                    title: req.body.title,
                    seller_id: req.body.seller_id,
                    price: req.body.price,
                    location: req.body.location,
                    category: req.body.category,
                    postal_code: req.body.postal_code,
                });
                res.json(response.data);
    }
    catch(err){
        console.log(err);
    }
};