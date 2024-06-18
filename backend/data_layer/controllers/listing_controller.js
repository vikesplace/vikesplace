import Listing from "../models/listing_models.js"

export const createListing = (req, res) => {
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
        return res.json({
            message: "Unable to create listing"
        });
    });
};

export const deleteListing = (req, res) => {
    Listing.update({
        status: "REMOVED"
    })
    .then((result) => {
        return res.json({
            message: "Deleted Listing"
        });
    })
    .catch((error) => {
        return res.json({
            message: "Unable to delete listing"
        });
    });
};