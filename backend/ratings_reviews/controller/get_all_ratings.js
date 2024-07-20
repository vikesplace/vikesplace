import axios from "axios";

export const getAllRatings = async (req, res) => {
    try {
        const response = await axios.get(`/rating/${req.params.listingId}`);
        return res.json({ratings: response.data});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to get ratings"});
    }
}