require("dotenv").config();
const nodemailer = require("nodemailer");

const defaultProfile = {
    host: process.env.DEFAULT_EMAIL_HOST,
    port: process.env.DEFAULT_EMAIL_PORT,
    debug: true,
    secure: process.env.SECURE_EMAIL_CONNECTION, // true for 465, false for other ports
    auth: {
        user: process.env.DEFAULT_EMAIL_USER, // generated ethereal user
        pass: process.env.DEFAULT_EMAIL_PASSWORD, // generated ethereal password
    },
};


module.exports.email_transport_profiles = {
    default: defaultProfile
};


module.exports.sendMail = async (emailTransportProfile = null, email, subject, message) => {
    const emailTransportProfileToUse = emailTransportProfile ? emailTransportProfile : this.email_transport_profiles.default;
    const transporter = nodemailer.createTransport(emailTransportProfileToUse);


    let info = await transporter.sendMail({
        from: '"' + process.env.APP_NAME + '"' + " <" + emailTransportProfileToUse.auth.user + ">", // sender address
        to: email, // list of receivers
        subject, // Subject line
        html: message, // html body
        // text: "Hello world?", // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    return info;
};