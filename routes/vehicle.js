const express = require('express');
const router = express.Router();
const controllers = require('../controllers/vehicle');
const middleware = require('../middleware/auth');


router.post('/createVehicle', middleware.verifyUser, controllers.newVehicle);
router.get('/getVehicle', middleware.verifyUser, controllers.getVehicles);
router.get('/getVehicleProfile', middleware.verifyUser, controllers.getvehicleProfile);
router.post('/updateImage', middleware.verifyUser, middleware.upload.single('images'), controllers.updateImage);
router.post('/updateVehicle', middleware.verifyUser, controllers.updateVehicle);
router.post('/deleteVehicle', middleware.verifyUser, controllers.deleteVehicle);


module.exports = router;