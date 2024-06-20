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

export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findByPk(req.params.listing_id);
        if (!listing) {
            return res.json({
                message: "Invalid input data"
            });
        }
        listing.status = "REMOVED";
        await listing.save();
    } catch (error) {
        return res.json({
            message: "Invalid input data"
        });
    }
}