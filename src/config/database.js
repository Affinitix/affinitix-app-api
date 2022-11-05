require("dotenv").config();
const mongoose = require("mongoose");



module.exports = {
    connect: async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URL);
            return true;
        } catch (err) {
            throw err;
        }

    }
};