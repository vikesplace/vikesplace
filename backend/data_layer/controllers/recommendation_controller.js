import Recommendation from '../models/recommendation_models.js';

export const makeRecommendation = (req, res) => {
    Recommendation.create({
        recommending_user_id: req.body.recommending_user_id,
        recommended_listing_id: req.body.recommended_listing_id,
        ignored: req.body.ignored
    })
    .then((result) => {
        return res.json({
            message: "Made Recommendation"
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: "Unable to make recommendation"
        });
    });
}