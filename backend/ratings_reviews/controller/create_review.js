import axios from 'axios';

export const createReview = async (req, res) => {
    try {
        const listingId = req.params.listingId;
        const userId = res.locals.decodedToken.userId;
        const response = await axios.post(`/review/${listingId}`, {
            review_content: req.body.review_content,
            review_user_id: userId,
            listing_rating_id: req.body.listing_rating_id
          });
          return res.json({
            ratingId: response.data.listing_rating_id,
            reviewedListingId: response.data.reviewed_listing_id,
            timestamp: response.data.timestamp,
          });
    } catch (error) {
        if (error.response && (error.response.status == 400)) {
            return res.status(400).json({ message: error.response.data.message });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Failed to create review"});
        }
    }
};