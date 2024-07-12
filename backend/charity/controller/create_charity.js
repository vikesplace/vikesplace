import axios from "axios";

export const createCharity = async (req, res) => {
    try {
        const response = await axios.post(`/charity`, {
            name: req.body.name,
            status: req.body.status,
            fund: req.body.fund,
            logo_url: req.body.logo_url,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            num_listings: req.body.num_listings
          });
          res.json(response.data);
    } catch (error) {
        if (error.response && (error.response.status == 400)) {
            return res.status(400).json({ message: error.response.data.message });
        } else {
            console.error(error);
            return res.status(500).json({ message: "Failed to create charity"});
        }
    }
}