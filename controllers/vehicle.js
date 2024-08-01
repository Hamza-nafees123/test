const functions = require('../functions/vehicle');

const newVehicle = async (req, res) => {
    try {
        let vehicle = await functions.vehicle(req);
        return res.status(200).json({msg: "Vehicle Profile is successfuly Created", vehicle});

    } catch (error) {
        console.log('Having errors while creating Vehicle Profile');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Creating Vehicle Profile:', error})    
    }
};

const updateImage = async (req, res) => {
    try {
        const { path, fieldname }= req.file;
        // console.log('file path by and fieldName Cloudnary:', path, fieldname);
        if(!req.file){
            return res.status(400).json({ msg: "Please Upload a Valid Image"});
        }
        let updateImage = await functions.updateImage(req);
        let vehicle = await functions.vehicleProfile(req);
        return res.status(200).json({ msg: 'Vehicle Image is Successfully updated', vehicle});      
    } catch (error) {
        console.log('Having errors while updating Vehicle Image');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While updating Vehicle Image:', error})  
    }
};

const getVehicles = async (req, res) =>{
    try {
        let vehicleProfile = await functions.getVehicles(req);
        return res.status(200).json({msg: "Your Vehicle Details: ", vehicleProfile});
    } catch (error) {
        console.log('Having errors while getting Vehicle');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Getting Vehicles:', error})    
    }
};

const getvehicleProfile = async (req, res) => {
    try {
        let vehicleProfile = await functions.vehicleProfile(req);
        return res.status(200).json({msg: "Vehilce Profile", vehicleProfile});
    } catch (error) {
        console.log('Having errors while getting Vehicle Profile');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Getting Vehicle Profile:', error})    
    }
};

const updateVehicle = async (req, res) =>{
    try {
        const id = req.body.id;
        const updatedData = req.body;
        console.log('Vehicle Id', id);
        console.log('Updated Data: ', updatedData);
        let update = await functions.updateVehicle(id, updatedData);
        return res.status(200).json({msg: "Data is Successfuly Updated: ", update});
    } catch (error) {
        console.log('Having errors while updating Vehicle Profile');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Updating Vehicle details:', error})    
    }
};


const deleteVehicle = async (req, res) =>{
    try {
        let vehicle = await functions.deleteVehicle(req);
        return res.status(200).json({msg: 'Vehicle is Successfully Deleted'});
    } catch (error) {
        console.log('Having errors while Deleting Vehicle Profile');
        console.error('Having these errors: ', error);
        res.status(400).json({msg: 'Having errors While Deleting Vehicle details:', error}) 
    }
};


module.exports = { 
    newVehicle,
    getVehicles,
    getvehicleProfile,
    updateImage,
    updateVehicle,
    deleteVehicle
};