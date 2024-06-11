import Review from "../models/review_models.js";

export const createReview = (req, res) => {
    console.log("test: ",req.body);
    Review.create({
        reviewed_listing_id: req.body.reviewed_listing_id,
        review_user_id: req.body.review_user_id,
        review_content: req.body.review_content,
        listing_rating_id: req.body.listing_rating_id
    })
    .then((result) => {
        return res.json({
            message: "Created Review"
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: "Unable to create review"
        });
    });
}