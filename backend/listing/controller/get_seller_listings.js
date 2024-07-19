import axios from "axios";
import { apiConfig } from "../config/apiConfig.js";

export const getSellerListings = async (req, res) => {
  try {
    const seller_id = res.locals.decodedToken.userId;
    const response = await axios.get(`${apiConfig.DATA_LAYER}listing/me`, {
      params: { seller_id: seller_id },
    });
    res.json(response.data);
  } catch (err) {
    if (err.response && (err.response.status == 400)) { // if bad request, return error to client
      return res.status(400).json({ message: err.response.data.message });
    } else { // if internal server error, log error and return message to client
        console.error(err);
        return res.status(500).json({ message: "Failed to get listings"});
    }
  }
};
