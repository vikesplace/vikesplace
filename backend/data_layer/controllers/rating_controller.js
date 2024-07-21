import Rating from "../models/rating_models.js";
import Users from "../models/user_models.js";
import sequelize from "sequelize";

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
        Users.hasMany(Rating, {foreignKey: 'user_id'});
        Rating.belongsTo(Users, {foreignKey: 'user_id'});

        const ratings = await Rating.findAll({
            where: {
                listing_id: req.params.listingId
            },
            attributes: [
                ["rating_value", "rating"],
                "timestamp",
                [sequelize.col("User.username"), "username"]
            ],
            include: {
                model: Users,
                attributes: [],
                as: "User"
            },
        });
        if (!ratings) {
            console.error("Listing not found");
            return res.status(500).send();
        }
        return res.status(200).json(ratings);
    } catch(error) {
        console.error(error);
        res.status(500).send();
    };
};
