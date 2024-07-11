import axios from "axios";

export const getAllRatings = async (req, res) => {
    try {
        const response = await axios.get(`/rating/${req.params.listingId}`);
        
        //append each rating_value from response.data to a new array
        const ratings = response.data.map((rating) => rating.rating_value);
        return res.json(ratings);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to get ratings"});
    }
}