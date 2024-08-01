const express = require('express');
const router = express.Router();
const controllers = require('../controllers/admin');
const middleware = require('../middleware/auth');

router.post('/adminSignup', controllers.adminSignup);
router.post('/adminLogin', controllers.adminLogin);
router.post('/verifyOTP', controllers.verifyOTP);
router.post('/updateEmail', middleware.verifyAdmin, controllers.updateAdminEmail);
router.post('/updatePassword', middleware.verifyAdmin, controllers.updateAdminPassword);

module.exports = router;