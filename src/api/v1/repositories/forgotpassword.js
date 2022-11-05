const { forgotpassword } = require("../models/");
const { getMongooseModelWithSelectedFields } = require("../helpers/");


module.exports.create = async (data, fieldstoReturn = []) => {
    if (fieldstoReturn.length > 0) {
        const createdForgotpassword = await forgotpassword.create(data);
        return getMongooseModelWithSelectedFields(createdForgotpassword, fieldstoReturn);
    }
    const createdForgotpassword = await forgotpassword.create(data);
    return createdForgotpassword.toObject();
};

module.exports.find = async (query, fieldstoReturn = []) => {

};

module.exports.findOne = async (query, fieldstoReturn = []) => {
    if (fieldstoReturn.length > 0) {
        const forgotpasswordRetrieved = await forgotpassword.findOne(query, fieldstoReturn);
        return forgotpasswordRetrieved ? userRetrieved.toObject() : null;
    }
    const forgotpasswordRetrieved = await forgotpassword.findOne(query);
    return forgotpasswordRetrieved ? forgotpasswordRetrieved.toObject() : null;
};

module.exports.findById = async (id, fieldstoReturn = []) => {
    if (fieldstoReturn.length > 0) {
        const forgotpasswordRetrieved = await forgotpassword.findById(id, fieldstoReturn);
        return forgotpasswordRetrieved.toObject();
    }
    const forgotpasswordRetrieved = await forgotpassword.findById(id);
    return forgotpasswordRetrieved.toObject();
};

module.exports.updateOne = async (id, data, fieldstoReturn = []) => {
    const result = await forgotpassword.updateOne({ _id: id }, data);
    if (result.modifiedCount == 0) {
        return null;
    }

    const updateForgotpassword = await this.findById(id, fieldstoReturn);
    return updateForgotpassword;
};

module.exports.updateMany = async (query, data, fieldstoReturn = []) => {

};

module.exports.findOneAndUpdate = async (query, data, fieldstoReturn = []) => {
    const result = await forgotpassword.findOneAndUpdate(query, data);
    if (result.modifiedCount == 0) {
        return null;
    }

    const updateForgotpassword = await this.findById(result._id, fieldstoReturn);
    return updateForgotpassword;
};
