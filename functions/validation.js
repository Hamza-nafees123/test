const userModel = require('../models/user');
const adminModel = require('../models/admin');
const bcrypt = require('bcrypt');

const validateEmail = async (req, res) => {
    console.log({email: req.body.email});
    const { email } = req.body;
    let existing = await userModel.findOne({email: email});
    if(existing){
        return true
    }else{
        return false
    };
};


const verifyPassword = async (password, hash) => {
    let match = await bcrypt.compare(password, hash);
    console.log('testing:', match);
    return match; 
};

const validateAdmin = async (req) => {
    console.log({email: req.body.email});
    const { email } = req.body;
    let existing = await adminModel.findOne({email: email});
    if(existing){
        return true;
    }else{
        return false;
    };
};

const verifyAdminPass = async (password, hash) => {
    let match = await bcrypt.compare(password, hash);
    console.log('testing:', match);
    return match
};

module.exports = {
    validateEmail,
    verifyPassword,
    validateAdmin,
    verifyAdminPass
}; 