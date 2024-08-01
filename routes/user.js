const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user');
const middleware = require('../middleware/auth');


router.post('/signup', controllers.signUp);
router.post('/verifyOTP', controllers.verifyOTP);
router.post('/login', controllers.login);
router.get('/userProfile', middleware.verifyUser, controllers.getProfile);
router.post('/updateImage', middleware.verifyUser, middleware.upload.single('image'), controllers.updateImage);
router.post('/updateUser', middleware.verifyUser, controllers.updateUser);
router.post('/forgetPassword', controllers.forgetPassword);
router.post('/updatePassword', controllers.updatePassword);

module.exports = router;

