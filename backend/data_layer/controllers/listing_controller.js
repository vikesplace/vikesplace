import Listing from "../models/listing_models.js"

export const createListing = (req, res) => {
    console.log("test: ",req.body);
    Listing.create({
        seller_id: req.body.seller_id,
        title: req.body.title,
        price: req.body.price,
        location: req.body.location,
        status: "AVAILABLE",
        category: req.body.category
    })
    .then((result) => {
        return res.json({
            message: "Created Listing"
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: "Unable to create listing"
        });
    });
};