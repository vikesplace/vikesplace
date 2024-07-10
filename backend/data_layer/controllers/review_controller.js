import Reviews from "../models/review_models.js";

export const createReview = (req, res) => {
    Review.create({
        listing_id: req.body.listing_id,
        user_id: req.body.user_id,
        review_content: req.body.review_content,
        rating_id: req.body.rating_id
    })
    .then((result) => {
        return res.json({
            message: "Created Review"
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: "Unable to create review"
        });
    });
}

export const getAllReviews = async (req, res) => {
    try {
        const entries = await Reviews.findAll({
            where: {
                listing_id: req.params.listingId
            }
        });
        if (!entries) {
            console.error("Listing not found");
            return res.status(500).send();
        }
        
        const reviews = entries.map(entry => {
            const {review_id, listing_id, user_id, review_content, rating_id, timestamp} = entry;
            return {
                review_content: review_content,
            };
        });

        res.json(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};
