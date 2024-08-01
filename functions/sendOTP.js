const { text } = require('body-parser');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: "albertlob913@gmail.com",
        pass:"xdos waum ywfy zpqn"
    }
});


const sendOTP = async (email, OTP) => {
    const mailOptionsUser = {
        from: "albertlob913@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP Code is ${OTP}`,

    };

    transporter.sendMail(mailOptionsUser, (error, info)=>{
        if(error){
            return console.log(error);
        }
        console.log('OTP Sent: '+ info.response);
    });
};


module.exports = sendOTP;