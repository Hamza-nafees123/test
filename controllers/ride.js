const functions = require('../functions/ride');


const createRide = async ( req, res ) => {
    try {
        let ride = await functions.createRide(req);
        return res.status(200).json({msg: 'Ride is Successfully Created', ride})
    } catch (error) {
        console.log('Ride is Not Created!');
        console.error('Having These Errors: ', error);
        res.status(400).json({msg: 'Having errors While creating Ride:', error})
    }
};

const rideStatus = async ( req, res ) => {
    try {
        const { id, status } = req.body;
        let validate = ['pending', 'in_progress', 'completed', 'cancelled'];
        if(!validate.includes(status)) {
            return res.status(400).json({msg: 'Ivalid Status'});
        }else{
        let ride = await functions.rideStatus(id, status);
        if(!ride){
            return res.status(404).json({msg: 'Ride Not Found'});
        }
        return res.status(200).json({msg: 'Ride status is Successfully updated', ride})

    }
    } catch (error) {
        console.log('Error while Updating Ride Status');
        console.error("having these Error:", error);
        res.status(400).json({msg: 'Having errors While Updating Ride Status:', error})

    }
};

const getRide = async ( req, res ) => {
    try {
        let ride = await functions.getRide(req);
        return res.status(200).json({msg:'Ride Data:', ride});
    } catch (error) {
        console.log('Error while getting Ride Data');
        console.error("having these Error:", error);
        res.status(400).json({msg: 'Having errors While Getting Ride:', error})

    }
};

const getAllRides = async (req, res) => {
    try {
        const userId = req.body.id;
        let rides = await functions.getAllRides(userId);
        return res.status(200).json({msg:"All rides by User:", rides});
    } catch (error) {
        console.log('Error while getting All Rides Data');
        console.error("having these Error:", error);
        res.status(400).json({msg: 'Having errors While Getting All Rides:', error})    
    }
}


module.exports = { 
    createRide,
    rideStatus,
    getRide,
    getAllRides
};