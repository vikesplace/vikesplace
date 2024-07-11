import Reviews from "../models/review_models.js";

export const createReview = async (req, res) => {
    try {
        const reviewResult = await Review.create({
            listing_id: req.params.listingId,
            user_id: req.body.user_id,
            review_content: req.body.review_content,
            rating_id: req.body.rating_id
        })

        res.json(reviewResult.dataValues);
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

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            where: {
                listing_id: req.params.listingId
            },
            attributes: ["review_content"]
        });
        if (!reviews) {
            console.error("Listing not found");
            return res.status(500).send();
        }
        res.json(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};