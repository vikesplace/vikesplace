import Rating from "../models/rating_models.js";

export const createRating = async (req, res) => {
  try {
    const ratingResult = await Rating.create({
      listing_id: req.body.listing_id,
      user_id: req.body.user_id,
      rating_value: req.body.rating_value,
    });
    res.json(ratingResult.dataValues);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      console.error(error);
      res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).send();
    }
  }
};
