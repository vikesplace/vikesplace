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

export const updateListing = (req, res) => {
    Listing.update({
        title: req.body.title,
        price: req.body.price,
        location: req.body.location,
        status: "AVAILABLE",
        category: req.body.category
    },
    { where: { _id: req.params.listing_id } 
    })
    .then((result) => {
        return res.json({
            message: "Updated Listing"
        });
    })
    .catch((error) => {
        return res.json({
            message: "Unable to update listing"
        });
    });
};

