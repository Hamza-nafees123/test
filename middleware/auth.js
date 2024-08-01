const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
require('dotenv').config();

cloudinary.config({
    cloud_name: 'duojjqxpa',
    api_key: '771445639819957',
    api_secret: '9vAFBQisiWpJQR106cLawdANSqI'
});

const storage = new CloudinaryStorage({
    // destination: function( req, file, cb){
    //     cb(null, './uploads');
    // },
    // filename: function(req, file, cb){
    //     cb(null, Date.now()+ '-' +file.originalname);
    // },
    cloudinary: cloudinary,
    params:{
        folder:'uploads',
        format: async (req, file) => {
            // Extract the original file extension
            const ext = path.extname(file.originalname).toLowerCase().slice(1);
            // Validate and allow only specific formats
            const allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];
            if (allowedFormats.includes(ext)) {
              return ext;
            }
            // If not an allowed format, default to 'png'
            return 'png';
        }   , // supports promises as well
        public_id: (req, file) => file.originalname.split('.')[0],
    }
});

const upload = multer({ storage: storage});

const verifyUser = ( req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify( bearerToken, process.env.SECRET_KEY, async(err, authData) => {
            if(err){
                return res.status(400).json({msg: 'Invalid Token'});
            } else {
                req.user = authData;
                next();
            }
        })
    } else {
        return res.status(500).json({msg: "Token Not Found"});
    }
};


const verifyAdmin = ( req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify( bearerToken, process.env.SECRET_KEY, async(err, authData) => {
            if (err) {
                return res.status(400).json({msg: 'Invalid Token'});
            } else {
                req.user = authData;
                next();
            }
        })  
    } else {
        return res.status(500).json({msg: "Token Not Found"});

    }
};


module.exports = { 
    upload,
    verifyUser,
    verifyAdmin
};