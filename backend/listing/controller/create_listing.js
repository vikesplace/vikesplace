import axiosInstance from "../config/axios.js";

export const createListing = async (req, res) => {
    try{
        const location = { type: 'Point', coordinates: [1,-1]};
        const response = await axiosInstance.post("/listing", {
            title: req.body.title,
            seller_id: req.body.seller_id,
            price: req.body.price,
            location: location,
            category: req.body.category,
        });
        console.log(response);
        res.json(response.data);
    }
    catch(err){
        console.log(err);
    }
};