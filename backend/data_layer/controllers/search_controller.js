import Search from '../models/search_models.js';

export const getSearchResults = (req, res) => {
    console.log(req);
    Search.findAll({
        where: {
            query: req.body.query
        }
    })
    .then((results) => {
        return res.json({
            message: "Retrieved Search Results",
            results: results
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: "Unable to retrieve search results"
        });
    });
}