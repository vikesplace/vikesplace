import Rating from "../models/rating_models.js";
import Users from "../models/user_models.js";

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


export const getAllRatings = async (req, res) => {    
    try {
        const ratings = await Rating.findAll({
            where: {
                listing_id: req.params.listingId
            },
            attributes: [
              ["rating_value", "rating"],
              "user_id",
              "timestamp"
            ]
        })
        if (!ratings) {
            console.error("Listing not found");
            return res.status(500).send();
        }
        
        const ratingsData = [];
        for (let i = 0; i < ratings.length; i++) {
            const user = await Users.findOne({
                where: {
                    user_id: ratings[i].dataValues.user_id
                },
                attributes: ["username"]
            });
            ratingsData.push({
                username: user.dataValues.username,
                rating: ratings[i].dataValues.rating,
                timestamp: ratings[i].dataValues.timestamp
            });
        }
        return res.status(200).json(ratingsData);
    } catch(error) {
        console.error(error);
        res.status(500).send();
    };
};
