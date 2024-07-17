import axios from "axios";

export const getAllReviews = async (req, res) => {
    try {
        const response = await axios.get(`/review/${req.params.listingId}`);
        const reviews = response.data.reviewContent.map((review) => {
            return review.reviewContent;
        });
        return res.json({reviews: reviews});
    } catch (err) {
        if (err.response && (err.response.status == 400)) { // if bad request, return error to client
            return res.status(400).json({ message: err.response.data.message });
        } else { // if internal server error, log error and return message to client
            console.error(err);
            return res.status(500).json({ message: "Failed to get reviews"});
        }
    }
};