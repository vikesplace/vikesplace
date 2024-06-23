import axios from 'axios';

export const getLongLat = async (req, res) => {
    try {
        const response = await axios.get(`/listing/location/${req.params.postal_code}`)
        res.json(response.data);
    } catch (error) {
        res.json({
            message: "Invalid input data"
        });
    }
}