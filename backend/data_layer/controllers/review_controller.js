import Review from "../models/review_models.js";
import Rating from "../models/rating_models.js";
import Users from "../models/user_models.js";
import sequelize from "sequelize";

export const createReview = async (req, res) => {
    try {
        const rating = await Rating.findOne({
            where: {
                listing_id: req.body.listing_id,
                user_id: req.body.user_id
            },
            attributes: [
                "rating_id"
            ]
        });
        let rating_id = null;
        if (rating) {
            rating_id = rating.dataValues.rating_id;
        }
        const reviewResult = await Review.create({
            listing_id: req.body.listing_id,
            user_id: req.body.user_id,
            review_content: req.body.review_content,
            rating_id: rating_id
        });
        res.json(reviewResult.dataValues);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error(error);
            res.status(400).json({ message: error.message });
        } else {
            console.error(error);
            res.status(500).send();
        }
    }
};

export const getAllReviews = async (req, res) => {
    try {
        Users.hasMany(Review, {foreignKey: 'user_id'});
        Review.belongsTo(Users, {foreignKey: 'user_id'});
        const reviews = await Review.findAll({
            where: {
                listing_id: req.params.listingId
            },
            attributes: [
                ["review_content", "review"],
                [sequelize.col("User.username"), "username"],
                ["timestamp", "createdOn"]
            ],
            include: {
                model: Users,
                attributes: [],
                as: "User"
            },
        });
        if (!reviews) {
            console.error("Listing not found");
            return res.status(500).send();
        }
        return res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).send();
    }
};