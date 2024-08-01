const vehicleModel = require('../models/vehicleProfile');


const vehicle = async (req) =>{
    const newVehicle = new vehicleModel(req.body);
    let result = await newVehicle.save();
    return result
};

const updateImage = async (req) => {
    let vehicle = await vehicleModel.findByIdAndUpdate({_id: req.body.id},
        { $set: {
            images: req.file.fieldname,
            imagePath: req.file.path,
        }},
    { new: true });
    return vehicle;
};

const getVehicles = async (req) => {
    // const {createdBy} = req.body;
    let vehicle = await vehicleModel.find({createdBy: req.body.id}) 
    return vehicle;
};

const vehicleProfile = async (req) => {  
    let vehicle = await vehicleModel.findById({_id: req.body.id},
        {}).populate({
            path:'fuelType',
            select: 'name fuelPrice color'
        });
    return vehicle;
};

const updateVehicle = async (id, updatedData) => {
    let vehicle = await vehicleModel.findByIdAndUpdate({_id: id},{$set: updatedData},{new:true})
    return vehicle;
};

const deleteVehicle = async (req) => {
    const id  = req.body.id;
    let vehicle = await vehicleModel.findByIdAndDelete(id, {new:true})
    return vehicle;
};


module.exports = {
    vehicle,
    updateImage,
    getVehicles,
    vehicleProfile,
    updateVehicle,
    deleteVehicle
};