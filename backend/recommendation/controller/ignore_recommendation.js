import axios from "axios";
import { apiConfig } from "../config/apiConfig";

export const ignoreRecommendation = async (req, res) => {
  try {
    const userId = res.locals.decodedToken.userId;
    const response = await axios.post(
      `${apiConfig.ALG_RECOMMENDATION}recommendations/${req.params.listingId}`,
      {
        params: {
          user_id: userId,
        },
      }
    );

    if (response.data.status === 200 && response.data.results === 1) {
      res.status(200).json();
    } else {
      res.status(422).json({ message: "Failed to Ignore Recommendation" });
    }
  } catch (error) {
    if (error.response && error.response.status == 400) {
      // if bad request, return error to client
      return res.status(400).json({ message: error.response.data.message });
    } else {
      // if internal server error, log error and return message to client
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to Ignore Recommendation" });
    }
  }
};
