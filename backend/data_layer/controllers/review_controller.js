import Review from "../models/review_models.js";
import Listings from "../models/listing_models.js";

export const createReview = async (req, res) => {
    try {
        const listing_entry = await Listings.findOne({
            where: {
                listing_id: req.params.listingId
            }
        });
        if (!listing_entry) {
            console.error("Listing not found");
            return res.status(500).send();
        }

        const {review_user_id, review_content, listing_rating_id} = req.body;
        await Review.create({
            reviewed_listing_id: listing_entry.listing_id,
            review_user_id: review_user_id,
            review_content: review_content,
            listing_rating_id: listing_rating_id
        });
        res.json({});
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error(error);
            res.status(400).json({ message: error.message });
        } else {
            console.error(error);
            res.status(500).send();
        }
    }
};