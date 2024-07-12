import axios from "axios";
import { apiConfig } from "../config/apiConfig.js";

export const getUserSearchHistory = async (req, res) => {
  try {
    const userId = res.locals.decodedToken.userId;
    const response = await axios.get(
      `${apiConfig.ALG_SEARCH}users/${userId}/searches`
    );

    if (response.data.results) {
      const arrayResults = response.data.results.map((search) => {
        return search.query;
      });
      res.json({ searches: arrayResults });
    } else {
      res.json({ searches: [] });
    }
  } catch (error) {
    if (error.response && error.response.status == 400) {
      // if bad request, return error to client
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    } else {
      // if internal server error, log error and return message to client
      console.error("Error getting searches:", error);
      return res.status(500).json({ message: "Error getting searches" });
    }
  }
};
