import axios from "axios";

export const getAllRatings = async (req, res) => {
    try {
        const response = await axios.get(`/rating/${req.params.listingId}`);
        const ratings = response.data.ratingValue.map((rating) => {
            return rating.ratingValue;
        });
        return res.json({ratings: ratings});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to get ratings"});
    }
}