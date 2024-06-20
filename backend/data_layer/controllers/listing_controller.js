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

export const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findByPk(req.params.listing_id);
        if (!listing) {
            return res.json({
                message: "Invalid input data"
            });
        }
        listing.title = req.body.title;
        listing.price = req.body.price;
        listing.location = req.body.location;
        listing.category = req.body.category;
        await listing.save();
    } catch (error) {
        return res.json({
            message: "Invalid input data"
        });
    }
};