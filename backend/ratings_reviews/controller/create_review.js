import axios from 'axios';

export const createReview = async (req, res) => {
    try {
        const listingId = req.params.listingId;
        const userId = res.locals.decodedToken.userId;
        const response = await axios.post(`/review`, {
            listing_id: listingId,
            review_content: req.body.reviewContent,
            user_id: userId,
          });
          return res.json({
            listingReviewId: response.data.review_id,
            reviewedListingId: response.data.listing_id,
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