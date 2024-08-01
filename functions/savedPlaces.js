const savedPlacesModel = require('../models/savedPlaces');

const createSavedPlace = async (req) => {
    const newSavedPlace = new savedPlacesModel(req.body);
    let result = await newSavedPlace.save();
    return result;
};

const getSavedplaces = async (req) => {
    const { userId } = req.body.id;
    let savedPlaces = await savedPlacesModel.find(userId);
    return savedPlaces;
};

const updateSavedPlace = async (id, updatedData) => {
    let savedPlace = await savedPlacesModel.findByIdAndUpdate(id, 
        { $set: updatedData},
        {new: true});
    return savedPlace;
};

const deleteSavedPlace = async (req) => {
    const id = req.body.id;
    let savedPlace = await savedPlacesModel.findByIdAndDelete(id);
    return savedPlace;
};


module.exports = {
    createSavedPlace,
    getSavedplaces,
    updateSavedPlace,
    deleteSavedPlace
};