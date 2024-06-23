import axios from 'axios';

export const getPostalCode = async (req, res) => {
    try {
        const response = await axios.get(`/listing/location/${req.params.longitude}/${req.params.latitude}`)
        res.json(response.data);
    } catch (error) {
        res.json({
            message: "Invalid input data"
        });
    }
}