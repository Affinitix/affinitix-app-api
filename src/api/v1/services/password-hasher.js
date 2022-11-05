const bcrypt = require('bcryptjs');


module.exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};


module.exports.verifyPassword = async (userInputedPasword, hashedPassword) => {
    const isCorrect = await bcrypt.compare(userInputedPasword, hashedPassword);
    return isCorrect;
};