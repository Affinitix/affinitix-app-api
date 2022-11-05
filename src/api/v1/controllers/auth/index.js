
const users = require("./users");
const admins = require("./admins");
const icons = require("./icons");
const forgotpassword = require("./forgotpassword");
const emailverifyer = require("./emailverifyer");
const auth = {
    users,
    admins,
    icons,
    forgotpassword,
    emailverifyer
};


module.exports = auth;