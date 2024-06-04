const listingService = require('../services/service');

exports.createListing = async (req, res) => {
    try {
        const newlisting = await listingService.createListing(req.body);
        res.status(201).json({ listing_id: newlisting.listing_id});
    } catch (error) {
        res.status(400).json({ message: "Invalid input data" });
    }
};