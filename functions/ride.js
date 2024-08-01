const rideModel = require('../models/ride');

const createRide = async (req) => {
    const ride = new rideModel(req.body);
    let result = await ride.save();
    return result;
};

const rideStatus = async (id, status) => {
    let ride = await rideModel.findByIdAndUpdate(id, { status: status }, { new: true });
    return ride;
};

const getRide = async (req) => {
    let ride = await rideModel.findById(req.body.id);
    return ride;
};

const getAllRides = async (userId) => {
    let ride = await rideModel.find({userId: userId});
    return ride;
};

module.exports = {
    createRide,
    rideStatus,
    getRide,
    getAllRides
};
