const express = require('express');
const router = express.Router();
const controllers = require('../controllers/currentFuelPrice');
const middleware = require('../middleware/auth');

router.post('/createFuelPrice', middleware.verifyAdmin, controllers.createFuelPrice);
router.get('/getFuelPrices', controllers.getFuelPrice);
router.post('/updateFuelPrice', middleware.verifyAdmin, controllers.updateFuelPrice);
router.post('/deleteFuelPrice', middleware.verifyAdmin, controllers.delteFuelPrice);

module.exports = router;