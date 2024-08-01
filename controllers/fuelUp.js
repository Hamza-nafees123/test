const functions = require('../functions/fuelUp');

const createFuelUp = async (req, res) => {
    try {
        let fuelUp = await functions.createfuelUp(req);
        return res.status(200).json({msg: 'Fuel Up is created Successfully:', fuelUp});
    } catch (error) {
        console.log('Error while Creating Feul Up');
        console.error("having these Error:", error);
        res.status(400).json({msg: 'Having errors While Creating Feul Up:', error});    
    
    }
};
const getFuelUp = async (req, res) => {
    try {
        let fuelUp = await functions.getfuelUp(req);
        return res.status(200).json({msg: 'All Fuel Up Details:', fuelUp});
    } catch (error) {
        console.log('Error while Getting Feul Up Details');
        console.error("having these Error:", error);
        res.status(400).json({msg: 'Having errors While Getting Feul Up Details:', error});
    }
};

const updateFuelUp = async (req, res) => {
    try {
        const id = req.body.id;
        const updatedData = req.body;
        let fuelUp = await functions.updateFuelUp(id, updatedData);
        return res.status(200).json({msg: "Data is Successfuly Updated:", fuelUp});
        
    } catch (error) {
        console.log('Error while Creating Feul Up');
        console.error("having these Error:", error);
        res.status(400).json({msg: 'Having errors While Creating Feul Up:', error});
    }
};

const deleteFuelUp = async (req, res) => {
    try {
        let fuelUp = await functions.deletefuelUp(req);
        return res.status(200).json({msg: 'Fuel Up is Successfuly Deleted'});
    } catch (error) {
        console.log('Error while Deleting Feul Up');
        console.error("having these Error:", error);
        res.status(400).json({msg: 'Having errors While Deleting Feul Up:', error});  
    }
};


module.exports = {
    createFuelUp,
    getFuelUp,
    updateFuelUp,
    deleteFuelUp
};