const express = require('express');
const router = express.Router();
const listingController = require('../controllers/controller');

router.post('/listings', listingController.createListing);

module.exports = router;