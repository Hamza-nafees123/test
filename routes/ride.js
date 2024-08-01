const express = require('express');
const router = express.Router();
const controllers = require('../controllers/ride');
const middleware = require('../middleware/auth');

router.post('/createRide', middleware.verifyUser, controllers.createRide);
router.post('/rideStatus', middleware.verifyUser, controllers.rideStatus);
router.get('/getRide', middleware.verifyUser, controllers.getRide);
router.get('/getAllRides', middleware.verifyUser, controllers.getAllRides);

module.exports = router;