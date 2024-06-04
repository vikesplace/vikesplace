const listingModel = require('../models/model');

exports.createListing = async (listingData) => {
    return await listingModel.create(listingData);
};