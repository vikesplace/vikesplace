import axios from 'axios';

export const createListing = async (req, res) => {
    try{
        //Temporary Location until Conversion Setup
        const location = { type: 'Point', coordinates: [1,-1]};
        const seller_id = res.locals.decodedToken.userId;
        const response = await axios.post("/listing",{
                    title: req.body.title,
                    seller_id: seller_id,
                    price: req.body.price,
                    location: location,
                    category: req.body.category
                });
                res.json(response.data);
    }
    catch(err){
        console.log(err);
    }
};