const functions = require('../functions/savedPlaces');


const createSavedPlace = async (req, res) => {
    try {
        let savedPlace = await functions.createSavedPlace(req);
        return res.status(200).json({ msg: 'Place is saved Successfully:', savedPlace});
    } catch (error) {
        console.log('Place not saved');
        console.error({ msg: 'error while Saving Place', error });
        res.status(400).json({msg: 'Having errors While Saving Plcae:', error})     
    }
};

const getSavedPlace = async (req, res) => {
    try {
        let savedPlace = await functions.getSavedplaces(req);
        return res.status(200).json({ msg: 'All Saved Places', savedPlace});
    } catch (error) {
        console.log('Can not get Saved Places');
        console.error({ msg: 'error while Getting Place', error });
        res.status(400).json({msg: 'Having errors While Saving Place:', error})
    }
};

const updateSavedPlace = async (req, res) => {
    try {
        const id = req.body.id;
        const updatedData = req.body;
        let savedPlace = await functions.updateSavedPlace(id, updatedData);
        return res.status(200).json({msg: 'Saved Place is Successfully Updated:', savedPlace});
    } catch (error) {
        console.log('Can not Update Saved Places');
        console.error({ msg: 'error while Updating Place', error });
        res.status(400).json({msg: 'Having errors While Updating Place:', error})
    }
};

const deleteSavedPlace = async (req, res) => {
    try {
        let savedPlace = await functions.deleteSavedPlace(req);
        return res.status(200).json({msg: 'Saved Place is Successfully Deleted'});
    } catch (error) {
        console.log('Can not get Delete Places');
        console.error({ msg: 'error while Deleting Place', error });
        res.status(400).json({msg: 'Having errors While Deleting Place:', error})
    }
};

module.exports = {
    createSavedPlace,
    getSavedPlace,
    updateSavedPlace,
    deleteSavedPlace
};