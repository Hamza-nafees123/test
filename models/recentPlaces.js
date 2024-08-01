const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recentPlaceSchema = new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates:{
            type: [Number],
            required: true,
        },
        name:{
            type: String,
            required: true
        }
    }
}, {timestamps:true});

recentPlaceSchema.index({ coordinates: '2dsphere'});


const recentPlacesModel = mongoose.model('RecentPlace', recentPlaceSchema);
module.exports = recentPlacesModel;