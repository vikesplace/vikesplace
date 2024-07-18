import axios from "axios";

export const createRating = async (req, res) => {
  try {
    const listingId = req.params.listingId;
    const userId = res.locals.decodedToken.userId;
    const response = await axios.post(`/rating`, {
      rating_value: req.body.ratingValue,
      listing_id: listingId,
      user_id: userId,
    });
    return res.json({
      ratingId: response.data.rating_id,
      timestamp: response.data.timestamp,
    });
  } catch (createError) {
    if (createError.response && createError.response.status == 400) {
      // if bad request, return error to client
      return res
        .status(createError.response.status)
        .json({ message: createError.response.data.message });
    } else {
      // if internal server error, log error and return message to client
      console.error("Error creating rating:", createError);
      return res.status(500).json({ message: "Error creating rating" });
    }
  }
};
