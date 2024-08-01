const functions = require('../functions/user');
const validation = require('../functions/validation');
const jwt = require('jsonwebtoken');
const sendOTP = require('../functions/sendOTP');
require('dotenv').config();


const signUp = async (req, res) => {
    try {
        const validate = await validation.validateEmail(req, res);
        if (validate) {
            return res.status(400).json({ msg: 'Email is Taken' });
        } else {
            console.log('Signing Up user');
            let user = await functions.signUp(req);
            let refreshToken = jwt.sign({
                name: user.firstName + user.lastName,
                email: user.email
            }, process.env.SECRET_KEY, { expiresIn: '3 days' });

            req.body.identifier = user.email;
            await functions.updateToken(req, refreshToken);
            let token = jwt.sign({
                name: user.firstName + user.lastName,
                email: user.email
            }, process.env.SECRET_KEY, { expiresIn: '2 hours' });

            const { email, OTP } = user;
            // console.log('For OTP:', email, OTP);
            await sendOTP(email, OTP);
            return res.status(200).json({
                msg: "user is Successfully Registered",
                user: {
                    email: user.email
                }

            });
        }
    } catch (error) {
        console.log('User Not Signed Up');
        console.error({ msg: 'error while signing user', error });
        res.status(400).json({msg: 'Having errors While Signing Up:', error})     
    }
};

const login = async (req, res) => {
    try {
        let validateUser = await validation.validateEmail(req);
        if(!validateUser){
            return res.status(400).json({msg: 'Email is invalid User do Not Exist'});
        };
        console.log('Logging User In');
        let user = await functions.getUser(req);
        const verify = await validation.verifyPassword(req.body.password, user.password);
        if(!verify){
            return res.status(403).json({msg: 'Please provide correct Password'});
        } 
        let refreshToken = jwt.sign({
            name: user.firstName + user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '3 days' });

        req.body.identifier = user.email;
        await functions.updateToken(req, refreshToken);
        let token = jwt.sign({
            name: user.firstName + user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '2 hours' });
        return res.status(200).json({
            msg: "user is Successfully Loggedin",
            user: {
                name: user.firstName + user.lastName,
                email: user.email,
                id: user._id,
            }, acessToken: token, refreshToken

        });        
    } catch (error) {
        console.log('User Not Signed Up');
        console.error({ msg: 'error while signing user', error });
        res.status(400).json({msg: 'Having errors While Logging In:', error})    
    }
};

const verifyOTP = async (req, res) => {
    try {
        // const {email, otp } = req.body;
        let user = await functions.verifyOTP(req);
        if (!user) {
            res.status(400).json({ msg: 'Invalid OTP or Email' });
        }
        user.OTP = null;
        await user.save();
        let refreshToken = jwt.sign({
            name: user.firstName + user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '3 days' });

        req.body.identifier = user.email;
        await functions.updateToken(req, refreshToken);
        let token = jwt.sign({
            name: user.firstName + user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '2 hours' });
        return res.status(200).json({
            user: {
                name: user.firstName + user.lastName,
                email: user.email,
                id: user._id
            }, accessToken: token, refreshToken
        });

    } catch (error) {
        console.log('User Not Signed Up');
        console.error({ msg: 'error while running OTP verification', error });
        res.status(400).json({msg: 'Having errors While verifying OTP:', error})    
    }
};

const getProfile = async (req, res) => {
    try {
        let user = await functions.getProfile(req);
        return res.status(200).json({msg: "User Profile:", user:{
            id: user._id,
            name: user.firstName + user.lastName,
            email: user.email,
        }});
    } catch (error) {
        console.log('Can not get User Profile');
        console.error({ msg: 'error while getting User Profile', error });
        res.status(400).json({msg: 'Having errors While getting User Profile:', error})    
    }
};



const forgetPassword = async (req, res) =>{
    try {
        console.log(req.body.email);
        email = req.body.email;
        const validate = await validation.validateEmail(req);
        if (validate) {
            let user = await functions.otpPassword(req);
            const {OTP} = user;
            sendOTP(email, OTP);
            return res.status(200).json({msg:"OTP is Sent. Check Your Email"});
           
        } else {
            return res.status(400).json({ msg: 'Invalid Email' });
        }
    } catch (error) {
        console.log('Password is Not updated');
        console.error({ msg: 'error while calling the Forget Password', error });   
        res.status(400).json({msg: 'Having errors:', error})    
    }
};

const updatePassword = async (req, res) =>{
    try {
        let user = await functions.updatePassword(req);
        let refreshToken = jwt.sign({
            // name: user.firstName + user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '3 days' });

        req.body.identifier = user.email;
        await functions.updateToken(req, refreshToken);
        let token = jwt.sign({
            name: user.firstName + user.lastName,
            email: user.email
        }, process.env.SECRET_KEY, { expiresIn: '2 hours' });
        return res.status(200).json({
            msg: "user is Successfully Loggedin",
            user: {
                name: user.firstName + user.lastName,
                email: user.email,
                id: user._id,
            }, acessToken: token, refreshToken

        });        
        // return res.status(200).json({msg: "Password is updated"});
    } catch (error) {
        console.log('Users Password is not updated');
        console.error({ msg: 'error while updating password', error });
        res.status(400).json({msg: 'Having errors While Updating Password:', error})    
    }
};

const updateImage = async (req, res) => {
    try {
        // console.log('Uploading Image');
        // console.log('Recived Image:', req.file);
        // console.log('user Id:', req.body.id);
        // const { path, fieldname }= req.file;
        if(!req.file){
            return res.status(400).json({msg: 'Please Upload an Image'});
        }
        const updateImage = await functions.updateImage(req);
        let user = await functions.getProfile(req);
        return res.status(200).json({msg: "Image is Successfully Uploaded:", 
            user:{
                userId: user._id,
                name: user.firstName + user.lastName,
                email: user.email,
                imagePath: user.imagePath
            }
        });
    } catch (error) {
        console.log('Users Image is not updated');
        console.error({ msg: 'error while updating Image', error });
        res.status(400).json({msg: 'Having errors While Updating Image:', error})    
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.body.id;
        const updatedData = req.body;
        let user = await functions.updateUser(id, updatedData);
        return res.status(200).json({msg: 'User Profile is Successfully Updated:', user:{
            id: user._id,
            name: user.firstName + user.lastName,
            email: user.email,
        }});
    } catch (error) {
        console.log('Users Profile is not updated');
        console.error({ msg: 'error while updating User Profile', error });
        res.status(400).json({msg: 'Having errors While Updating User Profile:', error})
    }
}

module.exports = {
    signUp,
    verifyOTP,
    login,
    getProfile,
    updateImage,
    forgetPassword,
    updatePassword,
    updateUser
};