const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    startLocation:{
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
    endLocation:{
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
    routeNo:{
        type: Number,
        required: true
    },
    distance:{
        type: Number,
        required: true
    },
    fuelConsumption:{
        type: Number,
        required: true
    },
    petrolPrice:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum:['pending', 'in_progress', 'completed'],
        default: 'pending'
    }
    
}, {timestamps: true});

rideSchema.index({ coordinates: '2dsphere'});
rideSchema.index({ coordinates: '2dsphere'});

const rideModel = mongoose.model('Ride', rideSchema);
module.exports = rideModel;