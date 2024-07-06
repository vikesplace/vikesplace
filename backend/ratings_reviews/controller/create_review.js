import axios from 'axios';

export const createReview = async (req, res) => {
    try {
        // get user_id from JWT
        const response = await axios.post(`/review/${req.params.listingId}`, {
            review_user_id: res.locals.decodedToken.userId,
            review_content: req.body.review_content,
            listing_rating_id: req.body.listing_rating_id
        });
        res.json(response.data);
    } catch (error) {
        if (error.response && (error.response.status == 400)) {
            return res.status(400).json({ message: error.response.data.message });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Failed to create review"});
        }
    }
};