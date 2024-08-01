const express = require('express');
const router = express.Router();
const controller = require('../controllers/savedPlaces');
const middleware = require('../middleware/auth');

router.post('/createSavedPlace', middleware.verifyUser, controller.createSavedPlace);
router.get('/getSavedPlaces', middleware.verifyUser, controller.getSavedPlace);
router.post('/updateSavedPlace', middleware.verifyUser, controller.updateSavedPlace);
router.post('/deleteSavedPlace', middleware.verifyUser, controller.deleteSavedPlace);

module.exports = router;