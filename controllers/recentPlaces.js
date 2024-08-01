const functions = require('../functions/recentPlaces');

const saveRecentPlace = async (req, res) => {
    try {
        let recentPlace = await functions.saveRecentPlace(req);
        return res.status(200).json({msg: 'Recent Place is Successfully Saved:', recentPlace});
    } catch (error) {
        console.log('Error while Saving Recent Place');
        console.error("having these Error:", error);
        res.status(400).json({msg: 'Having errors While Saving Recent Place:', error});
    }
};

const getRecentPlace = async (req, res) => {
    try {
        const userId = req.body.id;
        let recentPlaces = await functions.getRecentPlaces(userId);
        return res.status(200).json({msg: 'All recent Places Data:', recentPlaces});
    } catch (error) {
        console.log('Error while Getting Recent Place');
        console.error("having these Error:", error);
        res.status(400).json({msg: 'Having errors While Getting Recent Place:', error});
    }
};

const deleteRecentPlace = async (req, res) => {
    try {
        let recentPlace = await functions.deleteRecentPlace(req);
        return res.status(200).json({msg: 'Recent Place is deleted'});
    } catch (error) {
        console.log('Error while Deleting Recent Place');
        console.error("having these Error:", error);
        res.status(400).json({msg: 'Having errors While Deleting Recent Place:', error});
    }
};

module.exports = {
    saveRecentPlace,
    getRecentPlace,
    deleteRecentPlace
};