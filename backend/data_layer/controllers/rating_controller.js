import Rating from "../models/rating_models.js"

export const createRating = (req, res) => {
    Rating.create({
        listing_id: req.body.listing_id,
        user_id: req.body.user_id,
        rating_value: req.body.rating_value
    })
    .then((result) => {
        return res.json({
            message: "Created Rating"
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: "Unable to create rating"
        });
    });
}