const express = require('express');
const router = express.Router();
const controllers = require('../controllers/recentPlaces');
const middleware = require('../middleware/auth');

router.post('/saveRecentPlace', middleware.verifyUser, controllers.saveRecentPlace);
router.get('/getRecentPlaces', middleware.verifyUser, controllers.getRecentPlace);
router.post('/deleteRecentPlace', middleware.verifyUser, controllers.deleteRecentPlace);

module.exports = router;