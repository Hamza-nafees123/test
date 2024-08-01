const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    phNumebr:{
        type: Number,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    image:{
        type: String
    },
    imagePath:{
        type: String
    },
    sessionKey:{
        type: String,
    },
    OTP:{
        type: Number
    }
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;