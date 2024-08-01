const fuelUpModel = require('../models/fuelUp');


const createfuelUp = async (req) => {
    const fuelUp = new fuelUpModel(req.body);
    let result = await fuelUp.save();
    return result;
};

const getfuelUp = async (req) => {
    const { userId } = req.body.id;
    let fuelUp = await fuelUpModel.find(userId).populate({
        path:'car',
        select: 'vehicleMake vehicleModel vehicleIdentificaionNumber fuelType',
        populate:{
            path: 'fuelType',
            select: 'name fuelPrice color'
        }
    }).populate({
        path: 'fuelType',
        select: ' name fuelPrice color'
    });
    return fuelUp;
};

const updateFuelUp = async (id, updatedData) =>{
    let fuelUp = await fuelUpModel.findByIdAndUpdate(
        id, 
        {$set: updatedData }, 
        {new: true});
    return fuelUp;
};

const deletefuelUp = async (req) => {
    const id = req.body.id;
    let fuelUp = await fuelUpModel.findByIdAndDelete(id, {new:true});
    return fuelUp;
};

module.exports = {
    createfuelUp,
    getfuelUp,
    updateFuelUp,
    deletefuelUp
};