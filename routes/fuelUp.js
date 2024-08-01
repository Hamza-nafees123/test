const express = require('express');
const router = express.Router();
const controller = require('../controllers/fuelUp');
const middleware = require('../middleware/auth');

router.post('/createFuelUp', middleware.verifyUser, controller.createFuelUp);
router.get('/getFuelUp', middleware.verifyUser, controller.getFuelUp);
router.post('/updateFuelUp', middleware.verifyUser, controller.updateFuelUp);
router.post('/deleteFuelUp', middleware.verifyUser, controller.deleteFuelUp);

module.exports = router;