const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedPlaceSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    address:{
        type:{
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates:{
            type:[Number],
            required: true,
        },
        name:{
            type: String,
            required: true
        }
    },
    locationType:{
        type: String,
        enum: ['home', 'office', 'other'],
        required: true
    },
    color:{
        type: String,
        required: true
    }
}, { timestamps: true});

savedPlaceSchema.index({ coordinates: '2dsphere'});

const savedplacesModel = mongoose.model('SavedPlace', savedPlaceSchema);
module.exports = savedplacesModel;