import axios from "axios";
import "dotenv/config";

const charityToken = process.env.CHARITY_TOKEN;

export const createCharity = async (req, res) => {
  try {
    if (req.body.token !== charityToken) {
      res.status(401).json({ message: "Failed to create charity" });
    } else {
      const response = await axios.post(`/charity`, {
        name: req.body.name,
        status: req.body.status,
      });
      return res.json(response.data);
    }
  } catch (error) {
    if (error.response && error.response.status == 400) {
      return res.status(400).json({ message: error.response.data.message });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Failed to create charity" });
    }
  }
};
