require("dotenv").config();
const jwt = require("jsonwebtoken");

const secrete = process.env.JWT_SECRETE;

module.exports.generateToken = (payload) => {
    const expiresIn = "10h";
    const token = jwt.sign(payload, secrete, { expiresIn, });
    return { token, expiresIn };
};


/**
 * 
 * @param token 
 * @returns {verified,message,payload}
 */
module.exports.verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, secrete);
        return { verified: true, message: "Token verified successfully", payload };
    } catch (error) {
        const message = error.name == "JsonWebTokenError" ? "Invalid Token Supplied" : "Token Expired";
        return { verified: false, message };
    }

};