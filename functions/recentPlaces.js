const recentPlacesModel = require('../models/recentPlaces');

const saveRecentPlace = async (req) => {
    const newRecentPlace = new recentPlacesModel(req.body);
    let result = await newRecentPlace.save();
    return result;
};

const getRecentPlaces = async (userId) => {
    let getRecentPlaces = await recentPlacesModel.find({userId:userId});
    return getRecentPlaces;
};

const deleteRecentPlace = async (req) => {
    const id = req.body.id;
    let deleteRecentPlace = await recentPlacesModel(id);
    return deleteRecentPlace;
};

module.exports = {
    saveRecentPlace,
    getRecentPlaces,
    deleteRecentPlace
};