import axiosInstance from "../config/axios.js";

export const createListing = async (req, res) => {
    try{
        const response = await axiosInstance.post("/listing", {
            title: req.body.title,
            seller_id: req.body.seller_id,
            price: req.body.price,
            location: req.body.location,
            category: req.body.category,
        });
        res.json(response.data);
    }
    catch(err){
        console.log(err);
    }
};