const userModel = require('../models/user');
const bcrypt = require('bcrypt');

const signUp = async (req, sessionKey) => {
    const newUser = new userModel(req.body);
    let hash = await bcrypt.hash(req.body.password, 10);
    newUser.password = hash;
    newUser.sessionKey = sessionKey;
    const otp = Math.floor(1000 +
        Math.random()* 9000).toString();
        newUser.OTP = otp; 
    let result = await newUser.save();
    return result;
};

const updateToken = async (req, refreshToken) => {
    let user = await userModel.findOneAndUpdate({email: req.body.email}, {$set: {sessionKey: refreshToken} });
    return user;
};

const verifyOTP = async (req) =>{
    const { email, otp} = req.body;
    console.log(email,otp);
    let user = await userModel.findOne({email:email, OTP:otp});
    return user;
    // if(!user){
    //     return false
    // } 

    // user.OTP = null;
    // await user.save();
};

const getUser = async (req) => {
    let user = await userModel.findOne({email: req.body.email});
    return user;
};

const getProfile = async (req) => {
  let result = await userModel.findById(req.body.id);
  return result;  
};

const otpPassword = async (req) =>{
    let user = await userModel.findOne({email: req.body.email});
    const otp = Math.floor(1000 +
        Math.random()* 9000).toString();
        user.OTP = otp; 
    let result = await user.save();
    return result;
};

const forgetPassword = async (otp ,currerntPassword) => {
    // console.log(req.body.password);
    // const currentPassword = req.body.password;
    let newPassword = await userModel.findOneAndUpdate({OTP: otp}, {$set: {password: currerntPassword}} );
    return newPassword;
    
};

const updateImage = async (req) => {
    let user = await userModel.findByIdAndUpdate({_id: req.body.id}, 
        { $set: {
            image: req.file.fieldname,
            imagePath: req.file.path
        }},
        { new: true });
        return user;
};

const updatePassword = async (req) => {
    const userEmail = req.body.email;
    const newPassword = req.body.password;
    const hash = await bcrypt.hash(newPassword, 10);
    let updatedPassword = await userModel.findOneAndUpdate({email: userEmail}, {$set:{password: hash}} );
    return updatedPassword;
}; 

const updateUser = async (id, updatedData) => {
    let user = await userModel.findByIdAndUpdate(id, 
        { $set: updatedData },
        { new: true});
    return user;
};

module.exports = {
    signUp,
    updateToken,
    verifyOTP,
    otpPassword,
    forgetPassword,
    updatePassword,
    getUser,
    updateImage,
    getProfile,
    updateUser
};